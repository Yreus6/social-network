import * as dotenv from 'dotenv';

dotenv.config();

export default (on, config) => {
  config.env.auth_username = process.env.AUTH_USERNAME;
  config.env.auth_password = process.env.AUTH_PASSWORD;
  config.env.admin_username = process.env.ADMIN_USERNAME;
  config.env.admin_password = process.env.ADMIN_PASSWORD;
  config.env.okta_domain = process.env.OKTA_DOMAIN;
  config.env.okta_client_id = process.env.OKTA_CLIENTID;

  require('@cypress/code-coverage/task')(on, config);

  return config;
};
