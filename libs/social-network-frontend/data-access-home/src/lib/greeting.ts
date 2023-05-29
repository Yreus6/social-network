import { createApi } from '@reduxjs/toolkit/query/react';
import { environment } from '@env-frontend/environment';
import { axiosBaseQuery } from '@sn-htc/shared/data-access';
import { oktaAuth } from '@sn-htc/social-network-frontend-feature-auth';

export interface GenericResponse {
  content: string;
}

export const greetingApi = createApi({
  reducerPath: 'greetingApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${environment.apiBaseUrl}`,
    prepareHeaders: () => ({
      Authorization: `Bearer ${oktaAuth.getAccessToken()}`
    })
  }),
  endpoints: (builder) => ({
    getGreetingText: builder.query<GenericResponse, void>({
      query: () => ({
        url: '/greeting',
        method: 'GET'
      })
    })
  }),
})

export const { useGetGreetingTextQuery } = greetingApi;
