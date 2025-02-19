import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;