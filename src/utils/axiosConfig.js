import axios from "axios";
import store from "@/store";

const AxiosConfig = (config = axios.defaults) => {
  if (store.state.user.accessToken) {
    config.headers.authorization = `Bearer ${store.state.user.accessToken}`;
  }

  config.withCredentials = true;

  return config;
};
export default AxiosConfig;
