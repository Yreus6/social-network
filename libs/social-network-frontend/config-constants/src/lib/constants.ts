import { environment } from '@env-frontend/environment';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const oktaAuthConfig = {
  issuer: `https://${environment.oktaDomain}/oauth2/default`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
};

export const oktaSignInConfig = {
  baseUrl: `https://${environment.oktaDomain}`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
  features: {
    router: true,
    registration: true,
    showPasswordToggleOnSignInPage: true,
  },
  authParams: {
    scopes: ['openid', 'email', 'profile', 'groups']
  }
};
