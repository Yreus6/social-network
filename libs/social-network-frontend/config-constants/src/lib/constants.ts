import { environment } from '@sn-htc/social-network-frontend/config-env';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const oktaAuthConfig = {
  issuer: `https://${environment.oktaDomain}/oauth2/default`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/signin/callback',
};

export const oktaSignInConfig = {
  baseUrl: `https://${environment.oktaDomain}`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/signin/callback',
  i18n: {
    'en': {
      'primaryauth.username.placeholder': 'Email'
    }
  },
  features: {
    router: true,
    registration: true,
    showPasswordToggleOnSignInPage: true,
  },
  authParams: {
    scopes: ['openid', 'email', 'profile', 'groups', 'offline_access']
  }
};
