import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import searchReducer from '@/core/searchSlice';
import selectedItemsReducer from '@/core/selectedItemsSlice';
import { useSearchComicsQuery } from '@/core/apiSlice';
import { generateMockData } from './utils/generateMockData';
import Home from '@/components/home/Home';

vi.mock('@/core/apiSlice', () => ({
  useSearchComicsQuery: vi.fn(),
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

const detaildContent = 'Mocked Detailed Component';
vi.mock('@/components/detailed/Detailed', () => ({
  default: () => <div>{detaildContent}</div>,
}));

const createTestStore = (initialState = { search: { searchTerm: '' } }) => {
  return configureStore({
    reducer: {
      search: searchReducer,
      selectedItems: selectedItemsReducer,
    },
    preloadedState: initialState,
  });
};

describe('Home', () => {
  const mockUseSearchComicsQuery = vi.mocked(useSearchComicsQuery);
  let store: ReturnType<typeof createTestStore>;

  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockSearchParams = new URLSearchParams('query=test&page=1');

  const getMockUseSearchComicsQuery = (
    params: Partial<ReturnType<typeof useSearchComicsQuery>> = {}
  ): void => {
    mockUseSearchComicsQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      currentData: undefined,
      status: 'idle',
      isLoading: false,
      isSuccess: false,
      isUninitialized: false,
      originalArgs: undefined,
      endpointName: 'searchComics',
      startedTimeStamp: 0,
      fulfilledTimeStamp: 0,
      ...params,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as ReadonlyURLSearchParams);
  });

  it('renders header and search bar', () => {
    getMockUseSearchComicsQuery();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Star★Comics')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders loading spinner when fetching data', () => {
    getMockUseSearchComicsQuery({
      isFetching: true,
    });
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const error = 'Error fetching data';
    getMockUseSearchComicsQuery({
      isError: true,
      error,
    });
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('renders card list and flyout when data is available', () => {
    const mockData = generateMockData(2);
    getMockUseSearchComicsQuery({
      data: mockData,
    });
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Comic 1')).toBeInTheDocument();
    expect(screen.getByText('Comic 2')).toBeInTheDocument();
  });

  it('renders detailed content when showDetailed is true', () => {
    const mockData = generateMockData(1);
    getMockUseSearchComicsQuery({
      data: mockData,
    });
    render(
      <Provider store={store}>
        <Home showDetailed={true} />
      </Provider>
    );

    expect(screen.getByText(detaildContent)).toBeInTheDocument();
  });

  it('renders error button', () => {
    getMockUseSearchComicsQuery();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
  });
});
