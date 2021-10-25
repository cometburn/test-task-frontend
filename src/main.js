import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import eventbus from "./utils/eventbus";

import bootstrapVue from "./plugins/bootstrapVue";

Vue.prototype.$bus = eventbus;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  bootstrapVue,
  render: (h) => h(App),
}).$mount("#app");
