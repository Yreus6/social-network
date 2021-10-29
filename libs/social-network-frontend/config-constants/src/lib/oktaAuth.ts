import { OktaAuth } from '@okta/okta-auth-js';
import { oktaAuthConfig } from './constants';

export const oktaAuth = new OktaAuth(oktaAuthConfig);
