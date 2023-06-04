import { api as generatedApi } from './greeting';
import { oktaAuth } from '@sn-htc/social-network-frontend/config-constants';
import { client } from '@sn-htc/shared/data-access';

export const greetingApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['String'],
  endpoints: {
    greeting: {
      onQueryStarted: async (arg, _) => {
        client.setHeader('Authorization', `Bearer ${oktaAuth.getAccessToken()}`);
      },
      providesTags: (result, error, arg) => [{ type: 'String' }]
    }
  }
});

export const { useGreetingQuery, useLazyGreetingQuery } = greetingApi;
