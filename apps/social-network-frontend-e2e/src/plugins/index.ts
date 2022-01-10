import * as dotenv from 'dotenv';
import { gql, GraphQLClient } from 'graphql-request';

dotenv.config();

export default (on, config) => {
  config.env.auth_username = process.env.AUTH_USERNAME;
  config.env.auth_password = process.env.AUTH_PASSWORD;
  config.env.auth2_username = process.env.AUTH2_USERNAME;
  config.env.auth2_password = process.env.AUTH2_PASSWORD;
  config.env.okta_domain = process.env.OKTA_DOMAIN;
  config.env.okta_client_id = process.env.OKTA_CLIENTID;
  config.env.api_url = process.env.API_URL;

  require('@cypress/code-coverage/task')(on, config);

  on('task', {
    async 'db:seed'() {
      const client = new GraphQLClient(`${process.env.API_URL}/graphql`);
      const mutation = gql`
         mutation SeedData {
            seedData
         }
      `
      await client.request(mutation);

      return true;
    }
  })

  return config;
};
