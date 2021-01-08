module.exports = {
  get authEndPoint() {
    return window.localStorage.getItem("authEndpoint") || "";
  },
  set authEndPoint(value) {
    window.localStorage.setItem("authEndpoint", "");
  },

  get tokenEndpoint() {
    return window.localStorage.getItem("tokenEndpoint") || "";
  },
  set tokenEndpoint(value) {
    window.localStorage.setItem("tokenEndpoint", value);
  },

  get clientId() {
    return window.localStorage.getItem("clientId") || "";
  },
  set clientId(value) {
    window.localStorage.setItem("clientId", value);
  },

  get clientSecret() {
    return window.sessionStorage.getItem("clientSecret") || "";
  },
  set clientSecret(value) {
    window.sessionStorage.setItem("clientSecret", value);
  },

  get scope() {
    return window.localStorage.getItem("scope") || "";
  },
  set scope(value) {
    window.localStorage.setItem("scope", value);
  },

  get customParameters() {
    return window.localStorage.getItem("customParameters") || "";
  },
  set customParameters(value) {
    window.localStorage.setItem("customParameters", value);
  },

  get state() {
    return window.localStorage.getItem("state") || "";
  },
  set state(value) {
    window.localStorage.setItem("state", value);
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
    return JSON.parse(window.localStorage.getItem("accountsList")) || [];
  },
  set accountsList(value) {
    window.localStorage.setItem("accountsList", JSON.stringify(value));
  },

  get categoriesList() {
    return JSON.parse(window.localStorage.getItem("categoriesList")) || [];
  },
  set categoriesList(value) {
    window.localStorage.setItem("categoriesList", JSON.stringify(value));
  },

  get secretKey() {
    return window.localStorage.getItem("secretKey") || "";
  },
  set secretKey(value) {
    window.localStorage.setItem("secretKey", value);
  },

  get tmdbAPIKey() {
    return window.localStorage.getItem("tmdbAPIKey") || "";
  },
  set tmdbAPIKey(value) {
    window.localStorage.setItem("tmdbAPIKey", value);
  },

  get configBox() {
    return window.sessionStorage.getItem("configBox") || "";
  },
  set configBox(value) {
    window.sessionStorage.setItem("configBox", value);
  },
};
