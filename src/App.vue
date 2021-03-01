<template>
  <b-container>
    <h1>libDrive Config</h1>
    <p>
      Generate a config for
      <code><a href="https://github.com/libDrive/libDrive">libDrive</a></code
      >, the Google Drive media library
    </p>
    <p>
      Check out the
      <code
        ><a href="https://github.com/libDrive/libDrive/wiki"
          >config glossary</a
        ></code
      >
      for help!
    </p>
    <p>
      You must add the <code>Redirect URI</code> to your Developer Console web
      client credentials
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
            id="client-id-group"
            label="Client ID"
            label-for="client-id-input"
          >
            <b-form-input
              id="client-id-input"
              v-model="form.client_id"
              type="text"
              placeholder=""
              required
              :state="form.client_id.length > 0 ? null : false"
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
              v-model="form.client_secret"
              type="text"
              placeholder=""
              required
              :state="form.client_secret.length > 0 ? null : false"
            ></b-form-input>
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
                v-model="form.access_token"
                type="text"
                :disabled="true"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" v-clipboard:copy="form.access_token"
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
                v-model="form.refresh_token"
                type="text"
                :disabled="true"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  variant="primary"
                  v-clipboard:copy="form.refresh_token"
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
      <div v-for="(account, index) in form.account_list" v-bind:key="account">
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
                v-model="form.account_list[index].username"
                type="text"
                required
                :state="
                  form.account_list[index].username.length > 0 ? null : false
                "
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
                v-model="form.account_list[index].password"
                type="password"
                required
                :state="
                  form.account_list[index].password.length > 0 ? null : false
                "
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
                v-model="form.account_list[index].pic"
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
                v-model="form.account_list[index].auth"
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
        v-for="(category, index) in form.category_list"
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
                :text="form.category_list[index].type"
                id="category-type-input"
                v-model="form.category_list[index].type"
              >
                <b-dropdown-item disabled value="0"
                  >Select the media library's type</b-dropdown-item
                >
                <b-dropdown-item
                  v-for="option in ['Movies', 'TV Shows']"
                  :key="option"
                  :value="option"
                  @click="form.category_list[index].type = option"
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
                v-model="form.category_list[index].name"
                type="text"
                required
                :state="
                  form.category_list[index].name.length > 0 ? null : false
                "
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
                v-model="form.category_list[index].id"
                type="text"
                required
                :state="form.category_list[index].id.length > 0 ? null : false"
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
                v-model="form.category_list[index].driveId"
                type="text"
                required
                :state="
                  form.category_list[index].driveId.length > 0 ? null : false
                "
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
              v-model="form.secret_key"
              type="text"
              required
              :state="form.secret_key.length > 0 ? null : false"
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
              v-model="form.tmdb_api_key"
              type="text"
              required
              :state="form.tmdb_api_key.length > 0 ? null : false"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="isExtras">
      <b-col lg="6">
        <b-form-group
          id="cloudflare-group"
          label="Cloudflare"
          label-for="cloudflare-input"
        >
          <b-input-group>
            <b-form-input
              id="cloudflare-input"
              v-model="form.cloudflare"
              type="text"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group
          id="build-interval-group"
          label="Build Interval"
          label-for="build-interval-input"
        >
          <b-input-group>
            <b-form-input
              id="build-interval-input"
              v-model="form.build_interval"
              type="number"
              required
              :state="form.build_interval > 0 ? null : false"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="isExtras">
      <b-col lg="6">
        <b-form-group
          id="transcoded-group"
          label="Transcoded"
          label-for="transcoded-input"
        >
          <b-dropdown
            variant="primary"
            :text="form.transcoded"
            id="transcoded-input"
            v-model="form.transcoded"
          >
            <b-dropdown-item disabled value="False"
              >Select the media library's type</b-dropdown-item
            >
            <b-dropdown-item
              v-for="option in ['True', 'False']"
              :key="option"
              :value="option"
              @click="form.transcoded = option"
            >
              {{ option }}
            </b-dropdown-item>
          </b-dropdown>
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
      <b-button variant="primary" class="mr-2" @click="downloadToFile">
        Download
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="mr-2" @click="importFromFile">
        Import
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
      <input
        id="file-input"
        type="file"
        accept=".json"
        style="display: none"
        @change="handleFileChange"
      />
    </b-row>

    <hr />
    <footer class="text-center">
      <i
        >Source code is available on
        <a
          href="https://github.com/libDrive/config"
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
import cache from "./lib/cache";
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

        client_id: cache.client_id,
        client_secret: cache.client_secret,

        redirectUri: "",
        scope: cache.scope,

        customParameters: cache.customParameters,
        state: cache.state || generateState(),

        authCode: cache.authCode,
        access_token: cache.access_token,
        refresh_token: cache.refresh_token,

        account_list: cache.account_list,

        category_list: cache.category_list,

        secret_key: cache.secret_key,
        tmdb_api_key: cache.tmdb_api_key,
        cloudflare: cache.cloudflare,
        build_interval: cache.build_interval,
        transcoded: cache.transcoded,

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
        client_id: this.form.client_id,
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
            `${this.form.client_id}:${this.form.client_secret}`
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
      this.form.access_token = access_token;
      this.form.refresh_token =
        refresh_token || "Not provided by authorization server.";
      this.workflow.state = GOOGLE;
    },
    async tradeInrefresh_token() {
      this.updateAllCacheValues();

      const body = {
        grant_type: "refresh_token",
        refresh_token: this.form.refresh_token,
        scope: this.form.scope,
      };

      const { access_token, refresh_token } = await this.requestTokens(
        body,
        GOOGLE
      );

      this.form.access_token = access_token;
      this.form.refresh_token = refresh_token || this.form.refresh_token;
      this.workflow.state = GOOGLE;
    },
    async appendAccounts() {
      this.updateAllCacheValues();

      this.form.account_list.push({
        username: "",
        password: "",
        pic: "",
        auth: generateState(),
      });
    },
    async removeAccounts() {
      this.updateAllCacheValues();

      this.form.account_list.pop();
    },
    async appendCategories() {
      this.updateAllCacheValues();

      this.form.category_list.push({
        type: "",
        name: "",
        id: "",
        driveId: "",
      });
    },
    async removeCategories() {
      this.updateAllCacheValues();

      this.form.category_list.pop();
    },
    async returnConfig() {
      let config = {};
      config.access_token = this.form.access_token;
      config.account_list = this.form.account_list;
      config.build_interval = parseInt(this.form.build_interval);
      config.category_list = this.form.category_list;
      config.client_id = this.form.client_id;
      config.client_secret = this.form.client_secret;
      config.cloudflare = this.form.cloudflare;
      config.refresh_token = this.form.refresh_token;
      config.secret_key = this.form.secret_key;
      config.tmdb_api_key = this.form.tmdb_api_key;
      config.token_expiry = "";
      config.transcoded =
        this.form.transcoded.toLowerCase() === "true" || false;
      this.form.configBox = JSON.stringify(config, null, 4);

      this.updateAllCacheValues();
    },
    async returnOneLineConfig() {
      let config = {};
      config.access_token = this.form.access_token;
      config.account_list = this.form.account_list;
      config.build_interval = parseInt(this.form.build_interval);
      config.category_list = this.form.category_list;
      config.client_id = this.form.client_id;
      config.client_secret = this.form.client_secret;
      config.cloudflare = this.form.cloudflare;
      config.refresh_token = this.form.refresh_token;
      config.secret_key = this.form.secret_key;
      config.tmdb_api_key = this.form.tmdb_api_key;
      config.token_expiry = "";
      config.transcoded =
        this.form.transcoded.toLowerCase() === "true" || false;
      this.form.configBox = JSON.stringify(config);

      this.updateAllCacheValues();
    },
    async downloadToFile() {
      const a = document.createElement("a");
      const file = new Blob([this.form.configBox], { type: "text/plain" });

      a.href = URL.createObjectURL(file);
      a.download = "config.json";
      a.click();

      URL.revokeObjectURL(a.href);
    },
    async importFromFile() {
      document.getElementById("file-input").click();
    },
    async handleFileChange(e) {
      console.log(this.form);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        var lines = reader.result;
        var config = JSON.parse(lines);
        let newConfig = {};
        this.form.configBox = lines;
        for (var key in config) {
          eval("newConfig." + key + "= config." + key);
        }
        this.form = { ...this.form, ...newConfig };
      };
      reader.onerror = () => {
        return;
      };
      this.updateAllCacheValues();
    },
    updateAllCacheValues() {
      cache.authEndPoint = this.form.authEndpoint;
      cache.tokenEndpoint = this.form.tokenEndpoint;
      cache.client_id = this.form.client_id;
      cache.client_secret = this.form.client_secret;
      cache.scope = this.form.scope;
      cache.customParameters = this.form.customParameters;
      cache.state = this.form.state;
      cache.authCode = this.form.authCode;
      cache.access_token = this.form.access_token;
      cache.refresh_token = this.form.refresh_token;
      cache.account_list = this.form.account_list;
      cache.category_list = this.form.category_list;
      cache.secret_key = this.form.secret_key;
      cache.tmdb_api_key = this.form.tmdb_api_key;
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
