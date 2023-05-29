import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

export interface AxiosBaseQueryError {
  status: number | undefined;
  data: undefined;
}

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    AxiosBaseQueryError> =>
    async ({ url, method, data, headers }) => {
      try {
        const result = await axios({ url: baseUrl + url, method, data, headers });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: { status: err.response?.status, data: err.response?.data }
        };
      }
    };
