import axios from "axios";
import store from "./store";
import router from "./router";

export default function axiosInterceptors() {
  // 添加请求拦截器
  axios.interceptors.request.use(
    function(config) {
      if (store.state.token) {
        config.headers.Authorization = store.state.token;
      }
      return config;
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    function(response) {
      if (response.data.code === 999) {
        //清除token值
        store.dispatch({
          type: "setTokenAction",
          token: ""
        });
        router.replace("/");
        console.log("token过期");
      }
      return response;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
}
