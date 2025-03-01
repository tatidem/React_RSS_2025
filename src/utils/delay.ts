import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../app/apiSlice';

const minDelay = 100;

export const minDelayFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const startTime = Date.now();
  const result = await fetchBaseQuery({ baseUrl })(args, api, extraOptions);
  const endTime = Date.now();
  const requestDuration = endTime - startTime;
  if (requestDuration < minDelay) {
    const remainingDelay = minDelay - requestDuration;
    await new Promise((resolve) => setTimeout(resolve, remainingDelay));
  }

  return result;
};
