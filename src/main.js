import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/vue-clipboard";
import App from "./App.vue";

Vue.config.productionTip = false;

window.localStorage.setItem(
  "authEndpoint",
  "https://accounts.google.com/o/oauth2/v2/auth"
);
window.localStorage.setItem(
  "tokenEndpoint",
  "https://www.googleapis.com/oauth2/v4/token"
);
window.localStorage.setItem("scope", "https://www.googleapis.com/auth/drive");
window.localStorage.setItem(
  "customParameters",
  "access_type=offline&prompt=select_account+consent"
);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
