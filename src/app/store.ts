import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import searchReducer from './searchSlice';
import selectedItemsReducer from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
