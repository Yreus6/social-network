import { OktaAuth } from '@okta/okta-auth-js';
import { oktaAuthConfig } from '@sn-htc/social-network-frontend-feature-auth';

export const oktaAuth = new OktaAuth(oktaAuthConfig);
