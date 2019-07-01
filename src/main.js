import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./cube-ui";
import "amfe-flexible";
import axios from "axios";
import VueAxios from "vue-axios";
import axiosInterceptors from "./axiosInterceptors";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axiosInterceptors();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
