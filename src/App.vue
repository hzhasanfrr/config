<template>
  <b-container>
    <h1>libDrive Config</h1>
    <p>
      Generate a config for
      <code><a href="https://github.com/libDrive/libDrive">libDrive</a></code
      >, the Google Drive media library
    </p>
    <p>
      You must add the <code>Redirect URI</code> to your Developer Console web
      client credentials
    </p>
    <p>
      This web application stores non-secrets in local storage and secrets in
      session storage.
    </p>
    <hr />

    <b-form>
      <h2>Config Sections</h2>

      <b-row>
        <b-col>
          <b-form-group>
            <b-form-radio-group
              id="starting-state-group"
              v-model="workflow.state"
              :options="workflow.options"
              buttons
              name="radios-btn-default"
              button-variant="outline-primary"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col lg="6">
          <b-form-group
            id="authorization-endpoint-group"
            label="Authorization Endpoint"
            label-for="authorization-endpoint-input"
          >
            <b-form-input
              id="authorization-endpoint-input"
              v-model="form.authEndpoint"
              type="text"
              :disabled="true"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group
            id="token-endpoint-group"
            label="Token Endpoint"
            label-for="token-endpoint-input"
          >
            <b-form-input
              id="token-endpoint-input"
              v-model="form.tokenEndpoint"
              type="text"
              :disabled="true"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col lg="6">
          <b-form-group
            id="client-id-group"
            label="Client ID"
            label-for="client-id-input"
          >
            <b-form-input
              id="client-id-input"
              v-model="form.clientId"
              type="text"
              placeholder=""
              required
              :state="form.clientId.length > 0 ? null : false"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group
            id="client-secret-group"
            label="Client Secret"
            label-for="client-secret-input"
          >
            <b-form-input
              id="client-secret-input"
              v-model="form.clientSecret"
              type="text"
              placeholder=""
              required
              :state="form.clientSecret.length > 0 ? null : false"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col lg="6">
          <b-form-group
            id="redirect-uri-group"
            label="Redirect URI"
            label-for="redirect-uri-input"
          >
            <b-form-input
              id="redirect-uri-input"
              v-model="form.redirectUri"
              type="text"
              :disabled="true"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group id="scope-group" label="Scope" label-for="scope-input">
            <b-form-input
              id="scope-input"
              v-model="form.scope"
              type="text"
              placeholder=""
              :disabled="true"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col lg="6">
          <b-form-group id="state-group" label="State" label-for="state-input">
            <b-form-input
              id="state-input"
              v-model="form.state"
              type="text"
              :disabled="true"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group
            id="custom-parameters-group"
            label="Custom Parameters (Form-Encoded, Optional)"
            label-for="custom-parameters-input"
          >
            <b-form-input
              id="custom-parameters-input"
              v-model="form.customParameters"
              type="text"
              placeholder=""
              :disabled="true"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col>
          <b-form-group
            id="authorization-code-group"
            label="Authorization Code"
            label-for="authorization-code-input"
          >
            <b-input-group>
              <b-form-input
                id="authorization-code-input"
                v-model="form.authCode"
                type="text"
                :disabled="true"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" v-clipboard:copy="form.authCode"
                  >Copy</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col lg="6">
          <b-form-group
            id="access-token-group"
            label="Access Token"
            label-for="access-token-input"
          >
            <b-input-group>
              <b-form-input
                id="access-token-input"
                v-model="form.accessToken"
                type="text"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" v-clipboard:copy="form.accessToken"
                  >Copy</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group
            id="refresh-token-group"
            label="Refresh Token"
            label-for="refresh-token-input"
          >
            <b-input-group>
              <b-form-input
                id="refresh-token-input"
                v-model="form.refreshToken"
                type="text"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" v-clipboard:copy="form.refreshToken"
                  >Copy</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="isGoogle">
        <b-col>
          <b-button variant="primary" @click="getAuthCode">
            Get Credentials
            <b-spinner small v-if="workflow.showSpinner" />
          </b-button>
        </b-col>
      </b-row>
    </b-form>

    <div v-if="isAccounts">
      <div v-for="(account, index) in form.accountsList" v-bind:key="account">
        <b-card-title :title="'Account ' + index"></b-card-title>
        <b-row v-if="isAccounts">
          <b-col lg="6">
            <b-form-group
              id="accounts-username-group"
              label="Username"
              label-for="accounts-username-input"
            >
              <b-form-input
                id="accounts-username-input"
                v-model="form.accountsList[index].username"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="accounts-password-group"
              label="Password"
              label-for="accounts-password-input"
            >
              <b-form-input
                id="accounts-password-input"
                v-model="form.accountsList[index].password"
                type="password"
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="accounts-pic-group"
              label="Picture"
              label-for="accounts-pic-input"
            >
              <b-form-input
                id="accounts-pic-input"
                v-model="form.accountsList[index].pic"
                type="text"
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="accounts-auth-group"
              label="Auth"
              label-for="accounts-auth-input"
            >
              <b-form-input
                id="accounts-auth-input"
                v-model="form.accountsList[index].auth"
                type="text"
                placeholder=""
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-row v-if="isAccounts">
      <b-button variant="primary" class="ml-3" @click="appendAccounts">
        Add Account
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="ml-2" @click="removeAccounts">
        Remove Account
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
    </b-row>

    <div v-if="isCategories">
      <div
        v-for="(category, index) in form.categoriesList"
        v-bind:key="category"
      >
        <b-card-title :title="'Category ' + index"></b-card-title>
        <b-row>
          <b-col lg="6">
            <b-form-group
              id="category-type-group"
              label="Type"
              label-for="category-type-input"
            >
              <b-dropdown
                variant="primary"
                :text="form.categoriesList[index].type"
                id="category-type-input"
                v-model="form.categoriesList[index].type"
              >
                <b-dropdown-item disabled value="0"
                  >Select the media library's type</b-dropdown-item
                >
                <b-dropdown-item
                  v-for="option in ['Movies', 'TV Shows', 'Other']"
                  :key="option"
                  :value="option"
                  @click="form.categoriesList[index].type = option"
                >
                  {{ option }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="category-name-group"
              label="Name"
              label-for="category-name-input"
            >
              <b-form-input
                id="category-name-input"
                v-model="form.categoriesList[index].name"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="category-id-group"
              label="Folder ID"
              label-for="category-id-input"
            >
              <b-form-input
                id="category-id-input"
                v-model="form.categoriesList[index].id"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="category-driveid-group"
              label="Drive ID"
              label-for="category-driveid-input"
            >
              <b-form-input
                id="category-driveid-input"
                v-model="form.categoriesList[index].driveId"
                type="text"
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-row v-if="isCategories">
      <b-button variant="primary" class="ml-3" @click="appendCategories">
        Add Category
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="ml-2" @click="removeCategories">
        Remove Category
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
    </b-row>

    <b-row v-if="isExtras">
      <b-col lg="6">
        <b-form-group
          id="secret-key-group"
          label="Secret Key"
          label-for="secret-key-input"
        >
          <b-input-group>
            <b-form-input
              id="secret-key-input"
              v-model="form.secretKey"
              type="text"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group
          id="tmdb-api-key-group"
          label="TMDB API Key"
          label-for="tmdb-api-key-input"
        >
          <b-input-group>
            <b-form-input
              id="tmdb-api-key-input"
              v-model="form.tmdbAPIKey"
              type="text"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="isGenerate">
      <b-form-textarea
        id="textarea"
        v-model="form.configBox"
        placeholder=""
        rows="10"
      ></b-form-textarea>
    </b-row>

    <br />

    <b-row v-if="isGenerate">
      <b-button variant="primary" class="mr-2" @click="returnConfig">
        Generate Config
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="mr-2" @click="returnOneLineConfig">
        One Liner
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button
        variant="primary"
        class="mr-2"
        v-clipboard:copy="form.configBox"
      >
        Copy
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
    </b-row>

    <hr />
    <footer class="text-center">
      <i
        >Source code is available on
        <a
          href="https://github.com/neverendingqs/oauth2-client-shell-v2"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >.</i
      >
    </footer>
  </b-container>
</template>

<script>
import rand from "csprng";
import cache, {
  accessToken,
  accountsList,
  categoriesList,
  clientId,
  clientSecret,
  configBox,
  refreshToken,
  secretKey,
  tmdbAPIKey,
} from "./lib/cache";
import {
  GOOGLE,
  ACCOUNTS,
  CATEGORIES,
  EXTRAS,
  GENERATE,
} from "./lib/workflowStates";

function objToFormEncoded(obj) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      acc
        ? `${acc}&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    ""
  );
}

function generateState() {
  return rand(256, 36);
}

export default {
  name: "app",
  components: {},
  computed: {
    isGoogle() {
      return this.workflow.state === GOOGLE;
    },
    isAccounts() {
      return this.workflow.state === ACCOUNTS;
    },
    isCategories() {
      return this.workflow.state === CATEGORIES;
    },
    isExtras() {
      return this.workflow.state === EXTRAS;
    },
    isGenerate() {
      return this.workflow.state === GENERATE;
    },
  },
  data() {
    return {
      form: {
        authEndpoint: cache.authEndPoint,
        tokenEndpoint: cache.tokenEndpoint,

        clientId: cache.clientId,
        clientSecret: cache.clientSecret,

        redirectUri: "",
        scope: cache.scope,

        customParameters: cache.customParameters,
        state: cache.state || generateState(),

        authCode: cache.authCode,
        accessToken: cache.accessToken,
        refreshToken: cache.refreshToken,

        accountsList: cache.accountsList,

        categoriesList: cache.categoriesList,

        secretKey: cache.secretKey,
        tmdbAPIKey: cache.tmdbAPIKey,

        configBox: cache.configBox,
      },
      workflow: {
        options: [GOOGLE, ACCOUNTS, CATEGORIES, EXTRAS, GENERATE],
        showSpinner: false,
        state: GOOGLE,
      },
    };
  },
  methods: {
    getAuthCode() {
      this.updateAllCacheValues();
      let query = objToFormEncoded({
        response_type: "code",
        redirect_uri: this.form.redirectUri,
        client_id: this.form.clientId,
        scope: this.form.scope,
        state: this.form.state,
      });

      if (this.form.customParameters) {
        query += `&${this.form.customParameters}`;
      }

      window.location.href = `${this.form.authEndpoint}?${query}`;
    },
    handleError(msg, workflowStateOnError = GOOGLE) {
      this.$bvToast.toast(msg, {
        appendToast: false,
        noAutoHide: true,
        solid: true,
        title: "Error",
        toaster: "b-toaster-bottom-center",
        variant: "danger",
      });

      this.workflow.state = workflowStateOnError;
    },
    async requestTokens(body, workflowStateOnError) {
      this.workflow.showSpinner = true;
      const response = await fetch(this.form.tokenEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(
            `${this.form.clientId}:${this.form.clientSecret}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: objToFormEncoded(body),
      });

      if (!response.ok) {
        const responseText = await response.text();
        this.handleError(
          `Authorization server rejected the request with a status code of '${response.status}'. ` +
            `Body: '${responseText}'`,
          workflowStateOnError
        );
      }

      try {
        const { access_token, refresh_token } = await response.json();
        return { access_token, refresh_token };
      } catch (err) {
        const responseText = await response.text();
        this.handleError(
          `Unable to parse authorization server response: '${responseText}'`,
          workflowStateOnError
        );
      } finally {
        this.workflow.showSpinner = false;
      }
    },
    async tradeInAuthCode() {
      this.updateAllCacheValues();

      const body = {
        grant_type: "authorization_code",
        redirect_uri: this.form.redirectUri,
        code: this.form.authCode,
      };

      const { access_token, refresh_token } = await this.requestTokens(
        body,
        GOOGLE
      );

      this.form.authCode = `(Used) ${this.form.authCode}`;
      this.form.accessToken = access_token;
      this.form.refreshToken =
        refresh_token || "Not provided by authorization server.";
      this.workflow.state = GOOGLE;
    },
    async tradeInRefreshToken() {
      this.updateAllCacheValues();

      const body = {
        grant_type: "refresh_token",
        refresh_token: this.form.refreshToken,
        scope: this.form.scope,
      };

      const { access_token, refresh_token } = await this.requestTokens(
        body,
        GOOGLE
      );

      this.form.accessToken = access_token;
      this.form.refreshToken = refresh_token || this.form.refreshToken;
      this.workflow.state = GOOGLE;
    },
    async appendAccounts() {
      this.updateAllCacheValues();

      this.form.accountsList.push({
        username: "",
        password: "",
        pic: "",
        auth: generateState(),
      });
    },
    async removeAccounts() {
      this.updateAllCacheValues();

      this.form.accountsList.pop();
    },
    async appendCategories() {
      this.updateAllCacheValues();

      this.form.categoriesList.push({
        type: "",
        name: "",
        id: "",
        driveId: "",
      });
    },
    async removeCategories() {
      this.updateAllCacheValues();

      this.form.categoriesList.pop();
    },
    async returnConfig() {
      this.updateAllCacheValues();

      let config = `[CONFIG]\naccess_token=${accessToken}\naccount_list=${JSON.stringify(
        accountsList
      )}\ncategory_list=${JSON.stringify(
        categoriesList
      )}\nclient_id=${clientId}\nclient_secret=${clientSecret}\nrefresh_token=${refreshToken}\nsecret_key=${secretKey}\ntmdb_api_key=${tmdbAPIKey}\ntoken_expiry=`;
      this.form.configBox = config;
      this.updateAllCacheValues();
    },
    async returnOneLineConfig() {
      this.updateAllCacheValues();

      let newConfig = configBox.replaceAll("\n", "\\n");
      this.form.configBox = newConfig;
    },
    updateAllCacheValues() {
      cache.authEndPoint = this.form.authEndpoint;
      cache.tokenEndpoint = this.form.tokenEndpoint;
      cache.clientId = this.form.clientId;
      cache.clientSecret = this.form.clientSecret;
      cache.scope = this.form.scope;
      cache.customParameters = this.form.customParameters;
      cache.state = this.form.state;
      cache.authCode = this.form.authCode;
      cache.accessToken = this.form.accessToken;
      cache.refreshToken = this.form.refreshToken;
      cache.accountsList = this.form.accountsList;
      cache.categoriesList = this.form.categoriesList;
      cache.secretKey = this.form.secretKey;
      cache.tmdbAPIKey = this.form.tmdbAPIKey;
      cache.configBox = this.form.configBox;
    },
  },
  mounted() {
    this.form.redirectUri = window.location.origin;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    window.history.pushState({}, document.title, "/");

    if (state) {
      if (state !== this.form.state) {
        this.handleError(
          `State from authorization server (${state}) did not match the state we sent (${this.form.state}). They must match to prevent cross-site request forgery. Please try again.`
        );
        this.form.state = generateState();
        return;
      }

      if (!code) {
        this.handleError(
          'Authorization server returned an invalid response (missing "code" query string parameter).'
        );
        this.form.state = generateState();
        return;
      }

      this.form.authCode = code;
      this.tradeInAuthCode();
      this.workflow.state = GOOGLE;
    }

    this.form.state = generateState();
  },
};
</script>

<style>
body {
  padding: 2vh 0;
}
</style>
