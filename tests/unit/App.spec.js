import { expect } from "chai";
// import { shallowMount } from '@vue/test-utils';

import App from "@/App.vue";

import { GOOGLE, ACCOUNTS, CATEGORIES, EXTRAS, GENERATE } from "../../src/lib/workflowStates";

describe("App.vue", function() {
  describe("default data", function() {
    afterEach(function() {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    it("has correct default data when cache is empty", function() {
      const {
        form: {
          authEndpoint,
          tokenEndpoint,

          clientId,
          clientSecret,

          redirectUri,
          scope,

          customParameters,
          state: formState,

          authCode,
          accessToken,
          refreshToken,

          accountsList,

          categoriesList,

          secretKey,
          tmdbAPIKey,

          configBox,
        },
        workflow: { options, showSpinner, state: workflowState },
      } = App.data();

      expect(authEndpoint).to.be.empty;
      expect(tokenEndpoint).to.be.empty;

      expect(clientId).to.be.empty;
      expect(clientSecret).to.be.empty;

      expect(redirectUri).to.be.empty;
      expect(scope).to.be.empty;

      expect(customParameters).to.be.empty;
      expect(formState).to.not.be.empty;

      expect(authCode).to.be.empty;
      expect(accessToken).to.be.empty;
      expect(refreshToken).to.be.empty;

      expect(accountsList).to.be.empty;

      expect(categoriesList).to.be.empty;

      expect(secretKey).to.be.empty;
      expect(tmdbAPIKey).to.be.empty;

      expect(configBox).to.be.empty;

      expect(options).to.have.deep.members([GOOGLE, ACCOUNTS, CATEGORIES, EXTRAS, GENERATE]);
      expect(showSpinner).to.be.false;
      expect(workflowState).to.equal(GOOGLE);
    });
  });
});
