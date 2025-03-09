import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, useParams } from 'react-router';
import searchReducer from '../core/searchSlice';
import selectedItemsReducer from '../core/selectedItemsSlice';
import { useSearchComicsQuery } from '../core/apiSlice';
import { generateMockData } from './utils/generateMockData';
import Home from '../components/home/Home';

vi.mock('../core/apiSlice', () => ({
  useSearchComicsQuery: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock('../components/detailed/Detailed', () => ({
  default: vi.fn(() => <div>Outlet Content</div>),
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
  const mockUseParams = vi.mocked(useParams);
  let store: ReturnType<typeof createTestStore>;

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
  });

  it('renders header and search bar', () => {
    getMockUseSearchComicsQuery();
    mockUseParams.mockReturnValue({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Star★Comics')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders loading spinner when fetching data', () => {
    getMockUseSearchComicsQuery({
      isFetching: true,
    });
    mockUseParams.mockReturnValue({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
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
    mockUseParams.mockReturnValue({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('renders card list and flyout when data is available', () => {
    const mockData = generateMockData(2);
    getMockUseSearchComicsQuery({
      data: mockData,
    });
    mockUseParams.mockReturnValue({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Comic 1')).toBeInTheDocument();
    expect(screen.getByText('Comic 2')).toBeInTheDocument();
  });

  it('renders detail when uid is present', () => {
    const mockData = generateMockData(1);
    getMockUseSearchComicsQuery({
      data: mockData,
    });
    mockUseParams.mockReturnValue({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home showDetailed={true} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });

  it('renders error button', () => {
    getMockUseSearchComicsQuery();
    mockUseParams.mockReturnValue({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
  });
});
