import { OktaAuth } from '@okta/okta-auth-js';
import { oktaAuthConfig } from '@sn-htc/social-network-frontend/config-constants';

export const oktaAuth = new OktaAuth({
  ...oktaAuthConfig,
  pkce: false,
  transformAuthState: async (auth, authState) => {
    authState.isAuthenticated = auth.authStateManager.getAuthState()?.isAuthenticated;

    return authState;
  }
});
