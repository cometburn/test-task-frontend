import axios from "axios";
import store from "@/store";

const AxiosConfig = (config = axios.defaults) => {
  if (store.state.user.accessToken) {
    config.headers.authorization = `Bearer ${store.state.user.accessToken}`;
  }

  config.withCredentials = true;
  config.credentials = "include";
  config.mode = "cors";

  return config;
};
export default AxiosConfig;
