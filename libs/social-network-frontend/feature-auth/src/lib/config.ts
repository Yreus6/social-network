import { environment } from '@env-frontend/environment';

const oktaAuthConfig = {
  issuer: `https://${environment.oktaDomain}/oauth2/default`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
  baseUrl: `https://${environment.oktaDomain}`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
  features: {
    registration: true, // REQUIRED
  },
};

export { oktaAuthConfig, oktaSignInConfig };
