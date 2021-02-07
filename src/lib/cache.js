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

  get clientId() {
    return window.sessionStorage.getItem("clientId") || "";
  },
  set clientId(value) {
    window.sessionStorage.setItem("clientId", value);
  },

  get clientSecret() {
    return window.sessionStorage.getItem("clientSecret") || "";
  },
  set clientSecret(value) {
    window.sessionStorage.setItem("clientSecret", value);
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

  get accessToken() {
    return window.sessionStorage.getItem("accessToken") || "";
  },
  set accessToken(value) {
    window.sessionStorage.setItem("accessToken", value);
  },

  get refreshToken() {
    return window.sessionStorage.getItem("refreshToken") || "";
  },
  set refreshToken(value) {
    window.sessionStorage.setItem("refreshToken", value);
  },

  get accountsList() {
    return JSON.parse(window.sessionStorage.getItem("accountsList")) || [];
  },
  set accountsList(value) {
    window.sessionStorage.setItem("accountsList", JSON.stringify(value));
  },

  get categoriesList() {
    return JSON.parse(window.sessionStorage.getItem("categoriesList")) || [];
  },
  set categoriesList(value) {
    window.sessionStorage.setItem("categoriesList", JSON.stringify(value));
  },

  get secretKey() {
    return window.sessionStorage.getItem("secretKey") || "";
  },
  set secretKey(value) {
    window.sessionStorage.setItem("secretKey", value);
  },

  get tmdbAPIKey() {
    return window.sessionStorage.getItem("tmdbAPIKey") || "";
  },
  set tmdbAPIKey(value) {
    window.sessionStorage.setItem("tmdbAPIKey", value);
  },

  get configBox() {
    return window.sessionStorage.getItem("configBox") || "";
  },
  set configBox(value) {
    window.sessionStorage.setItem("configBox", value);
  },
};
