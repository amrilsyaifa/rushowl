import _axios from "axios";

import { setupInterceptorsTo } from "./interceptor";
const axiosInstance = _axios.create();
export const axios = setupInterceptorsTo(axiosInstance);

export default axios;
