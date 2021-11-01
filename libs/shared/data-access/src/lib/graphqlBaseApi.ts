import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { environment } from '@sn-htc/social-network-frontend/config-env';

export const client = new GraphQLClient(`${environment.apiBaseUrl}/graphql`);
export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: () => ({})
});
