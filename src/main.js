import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/vue-clipboard";
import App from "./App.vue";

Vue.config.productionTip = false;

window.sessionStorage.setItem(
  "authEndpoint",
  "https://accounts.google.com/o/oauth2/v2/auth"
);
window.sessionStorage.setItem(
  "tokenEndpoint",
  "https://www.googleapis.com/oauth2/v4/token"
);
window.sessionStorage.setItem("scope", "https://www.googleapis.com/auth/drive");
window.sessionStorage.setItem(
  "customParameters",
  "access_type=offline&prompt=select_account+consent"
);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
