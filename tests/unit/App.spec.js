import { expect } from "chai";
// import { shallowMount } from '@vue/test-utils';

import App from "@/App.vue";

import {
  GOOGLE,
  ACCOUNTS,
  CATEGORIES,
  EXTRAS,
  GENERATE,
} from "../../src/lib/workflowStates";

describe("App.vue", function () {
  describe("default data", function () {
    afterEach(function () {
      window.sessionStorage.clear();
    });

    it("has correct default data when cache is empty", function () {
      const {
        form: {
          authEndpoint,
          tokenEndpoint,

          client_id,
          client_secret,

          redirectUri,
          scope,

          customParameters,
          state: formState,

          authCode,
          access_token,
          refresh_token,

          account_list,

          cetegory_list,

          secret_key,
          tmdb_api_key,

          configBox,
        },
        workflow: { options, showSpinner, state: workflowState },
      } = App.data();

      expect(authEndpoint).to.be.empty;
      expect(tokenEndpoint).to.be.empty;

      expect(client_id).to.be.empty;
      expect(client_secret).to.be.empty;

      expect(redirectUri).to.be.empty;
      expect(scope).to.be.empty;

      expect(customParameters).to.be.empty;
      expect(formState).to.not.be.empty;

      expect(authCode).to.be.empty;
      expect(access_token).to.be.empty;
      expect(refresh_token).to.be.empty;

      expect(account_list).to.be.empty;

      expect(cetegory_list).to.be.empty;

      expect(secret_key).to.be.empty;
      expect(tmdb_api_key).to.be.empty;

      expect(configBox).to.be.empty;

      expect(options).to.have.deep.members([
        GOOGLE,
        ACCOUNTS,
        CATEGORIES,
        EXTRAS,
        GENERATE,
      ]);
      expect(showSpinner).to.be.false;
      expect(workflowState).to.equal(GOOGLE);
    });
  });
});
