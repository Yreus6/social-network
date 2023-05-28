import { createApi } from '@reduxjs/toolkit/query/react';
import { environment } from '../../../environments/environment';
import axiosBaseQuery from '../axios-base-query';

export interface GenericResponse {
  content: string;
}

export const greetingApi = createApi({
  reducerPath: 'greetingApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${environment.apiBaseUrl}` }),
  endpoints: (builder) => ({
    getGreetingText: builder.query<GenericResponse, void>({
      query: () => ({
        url: '/greeting',
        method: 'GET'
      })
    })
  })
});

export const { useGetGreetingTextQuery } = greetingApi;
