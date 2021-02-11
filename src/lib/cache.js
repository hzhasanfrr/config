module.exports = {
  get authEndPoint() {
    return window.sessionStorage.getItem("authEndpoint") || "";
  },
  set authEndPoint(value) {
    window.sessionStorage.setItem("authEndpoint", "");
  },

  get tokenEndpoint() {
    return window.sessionStorage.getItem("tokenEndpoint") || "";
  },
  set tokenEndpoint(value) {
    window.sessionStorage.setItem("tokenEndpoint", value);
  },

  get client_id() {
    return window.sessionStorage.getItem("client_id") || "";
  },
  set client_id(value) {
    window.sessionStorage.setItem("client_id", value);
  },

  get client_secret() {
    return window.sessionStorage.getItem("client_secret") || "";
  },
  set client_secret(value) {
    window.sessionStorage.setItem("client_secret", value);
  },

  get cloudflare() {
    return window.sessionStorage.getItem("cloudflare") || "";
  },
  set cloudflare(value) {
    window.sessionStorage.setItem("cloudflare", value);
  },

  get scope() {
    return window.sessionStorage.getItem("scope") || "";
  },
  set scope(value) {
    window.sessionStorage.setItem("scope", value);
  },

  get customParameters() {
    return window.sessionStorage.getItem("customParameters") || "";
  },
  set customParameters(value) {
    window.sessionStorage.setItem("customParameters", value);
  },

  get state() {
    return window.sessionStorage.getItem("state") || "";
  },
  set state(value) {
    window.sessionStorage.setItem("state", value);
  },

  get authCode() {
    return window.sessionStorage.getItem("authCode") || "";
  },
  set authCode(value) {
    window.sessionStorage.setItem("authCode", value);
  },

  get access_token() {
    return window.sessionStorage.getItem("access_token") || "";
  },
  set access_token(value) {
    window.sessionStorage.setItem("access_token", value);
  },

  get refresh_token() {
    return window.sessionStorage.getItem("refresh_token") || "";
  },
  set refresh_token(value) {
    window.sessionStorage.setItem("refresh_token", value);
  },

  get account_list() {
    return JSON.parse(window.sessionStorage.getItem("account_list")) || [];
  },
  set account_list(value) {
    window.sessionStorage.setItem("account_list", JSON.stringify(value));
  },

  get category_list() {
    return JSON.parse(window.sessionStorage.getItem("category_list")) || [];
  },
  set category_list(value) {
    window.sessionStorage.setItem("category_list", JSON.stringify(value));
  },

  get secret_key() {
    return window.sessionStorage.getItem("secret_key") || "";
  },
  set secret_key(value) {
    window.sessionStorage.setItem("secret_key", value);
  },

  get tmdb_api_key() {
    return window.sessionStorage.getItem("tmdb_api_key") || "";
  },
  set tmdb_api_key(value) {
    window.sessionStorage.setItem("tmdb_api_key", value);
  },

  get configBox() {
    return window.sessionStorage.getItem("configBox") || "";
  },
  set configBox(value) {
    window.sessionStorage.setItem("configBox", value);
  },
};
