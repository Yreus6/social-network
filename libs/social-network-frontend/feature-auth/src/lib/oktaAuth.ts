import { OktaAuth } from '@okta/okta-auth-js';
import { oktaAuthConfig } from '@sn-htc/social-network-frontend/config-constants';

export const oktaAuth = new OktaAuth(oktaAuthConfig);
