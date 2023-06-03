import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

export interface AxiosBaseQueryError {
  status: number | undefined;
  data: undefined;
}

export interface AxiosBaseQueryArgs {
  baseUrl: string;
  prepareHeaders?: () => Record<string, string>
}

export const axiosBaseQuery =
  ({ baseUrl, prepareHeaders }: AxiosBaseQueryArgs = { baseUrl: '' }): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    AxiosBaseQueryError> =>
    async ({ url, method, data, headers }) => {
      try {
        if (prepareHeaders) {
          headers = {
            ...headers,
            ...prepareHeaders()
          };
        }

        const result = await axios({ url: baseUrl + url, method, data, headers });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: { status: err.response?.status, data: err.response?.data }
        };
      }
    };
