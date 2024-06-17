import _axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "universal-cookie";
import { identityToken } from "@/constants/cookie";
import onRefreshToken from "./refreshToken";

const cookies = new Cookies(null, { path: "/" });

const axiosInstance = _axios.create();

const API_BASE_URL = process.env["REACT_APP_FOO"];

export const isClientSide = typeof window !== "undefined";

export interface FetchTokenResponse {
  token: string;
}

interface QueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;

// Store requests that waiting for refresh token
let failedQueue: QueueItem[] = [];

function processQueue(err: Error | null, token = "") {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = cookies.get(identityToken);
  config.headers["Content-Type"] = "application/json";

  config.headers.Accept = "application/json";
  if (config?.params?.isFormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  config.baseURL = `${API_BASE_URL}`;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * this handle if request have error
 */
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

/**
 * this handle if request have response
 */
const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

/**
 * this handle if response have error
 */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest: any = error.config;

  // If error from refresh token api we immediately return error
  if (originalRequest.url === `${API_BASE_URL}/v1/auth/refresh-token`) {
    return Promise.reject(error);
  }

  if (error?.response?.status !== 401) {
    // Other error not 401 we can safely return error
    return Promise.reject(error);
  }

  if (!isRefreshing && !originalRequest._retry) {
    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      onRefreshToken(`${API_BASE_URL}/v1/auth/refresh-token`)
        .then(async (res: any) => {
          originalRequest.headers.Authorization =
            "Bearer " + res?.headers?.token;
          await axiosInstance(originalRequest);
          processQueue(null, res?.headers?.token);
          resolve(res);
        })
        .catch((err: Error | null) => {
          // If can't get new token when we might need force user logout
          // Ex: store.dispatch(usersActions.logout());
          processQueue(err);
          reject(err);
        })
        .then(() => {
          isRefreshing = false;
        });
    });
  }

  if (isRefreshing) {
    return new Promise(function (resolve, reject) {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest.headers.Authorization = "Bearer " + token;
        return axiosInstance(originalRequest);
      })
      .catch((err) => {
        return err;
      });
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
