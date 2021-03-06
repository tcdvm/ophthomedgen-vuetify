import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import VueClipboard from "vue-clipboard2";

Vue.use(require("vue-shortkey"), { prevent: ["input", "textarea"] });
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
