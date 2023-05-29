import * as dotenv from 'dotenv';

dotenv.config();

export default (on, config) => {
  config.env.auth_username = process.env.AUTH_USERNAME;
  config.env.auth_password = process.env.AUTH_PASSWORD;
  config.env.okta_domain = process.env.OKTA_DOMAIN;
  config.env.okta_client_id = process.env.OKTA_CLIENTID;

  return config;
};
