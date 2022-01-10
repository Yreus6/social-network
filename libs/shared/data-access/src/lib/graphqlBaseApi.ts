import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { environment } from '@sn-htc/social-network-frontend/config-env';
import { oktaAuth } from '@sn-htc/social-network-frontend/config-constants';
import { v4 as uuidv4 } from 'uuid';

export const client = new GraphQLClient(`${environment.apiBaseUrl}/graphql`);
const headers = {
  'Authorization': `Bearer ${oktaAuth.getAccessToken()}`
};

export const api = createApi({
  reducerPath: uuidv4(),
  baseQuery: graphqlRequestBaseQuery({
    client,
    requestHeaders: oktaAuth.getAccessToken() ? headers : new Headers()
  }),
  endpoints: () => ({}),
});
