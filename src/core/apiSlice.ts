import { createApi } from '@reduxjs/toolkit/query/react';
import { ComicDetail, SearchResult } from '../interfaces';
import { minDelayFetchBaseQuery } from './utils/delay';

export const baseUrl = 'https://stapi.co/api/v1/rest';
export const detailUrl = baseUrl + '/comics?uid=';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: minDelayFetchBaseQuery,
  endpoints: (builder) => ({
    searchComics: builder.query<SearchResult, string>({
      query: (name) => ({
        url: '/comics/search',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${name}&title=${name}`,
      }),
    }),
    getComicDetails: builder.query<ComicDetail, string>({
      query: (uid) => `/comics?uid=${uid}`,
      transformResponse: (response: { comics: ComicDetail }) => {
        return response.comics;
      },
    }),
  }),
});

export const { useSearchComicsQuery, useGetComicDetailsQuery } = apiSlice;
