import _axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { identityRefreshToken, identityToken } from "@/constants/cookie";
import onLogout from "./logout";

const cookies = new Cookies(null, { path: "/" });

const axiosInstance = _axios.create();

const onRefreshToken = (url: string): Promise<void | AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const token = cookies.get(identityToken);
    const refreshToken = cookies.get(identityRefreshToken);
    const refreshTokenUrl = `${url}`;
    axiosInstance
      .post(refreshTokenUrl, null, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Refresh-Token": refreshToken,
        },
      })
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        if (
          err?.response?.status === 403 ||
          err?.response?.data?.response_status === 403 ||
          (err?.response?.status === 401 &&
            err?.response?.data?.response_status === 401 &&
            err?.response?.data?.message === "unauthorized")
        ) {
          onLogout();
          return reject(err);
        }
        return reject(err);
      });
  });
};

export default onRefreshToken;
