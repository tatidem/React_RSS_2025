import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import searchReducer from '@/core/searchSlice';
import selectedItemsReducer from '@/core/selectedItemsSlice';
import SearchBar from '@/components/searchBar/SearchBar';
import React from 'react';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const createTestStore = (
  initialState = { search: { searchTerm: '' }, selectedItems: { items: [] } }
) => {
  return configureStore({
    reducer: {
      search: searchReducer,
      selectedItems: selectedItemsReducer,
    },
    preloadedState: initialState,
  });
};

describe('SearchBar', () => {
  const mockPush = vi.fn();
  const mockRouter = {
    pathname: '/',
    query: {},
    push: mockPush,
    route: '/',
    asPath: '/',
    basePath: '',
    isLocaleDomain: false,
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  it('renders input and button', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates query state on input change', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('calls handleSearch with trimmed query on button click', async () => {
    const store = createTestStore();
    //vi.spyOn(React, 'useEffect').mockImplementationOnce(() => {});

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  test query  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/',
        query: { query: 'test query', page: '1' },
      });
    });

    // await waitFor(() => {
    //   expect(store.getState().search.searchTerm).toBe('test query');
    // });
  });

  it('syncs searchTerm from Redux with query state on mount', async () => {
    const initialTerm = 'initial term';
    const store = createTestStore({
      search: { searchTerm: initialTerm },
      selectedItems: { items: [] },
    });

    vi.mocked(useRouter).mockReturnValue({
      ...mockRouter,
      query: { query: initialTerm },
    });

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    await waitFor(() => {
      expect(input).toHaveValue(initialTerm);
    });
  });

  it('does not call handleSearch if query is the same as searchTerm', async () => {
    const initialTerm = 'test query';
    const store = createTestStore({
      search: { searchTerm: initialTerm },
      selectedItems: { items: [] },
    });

    vi.mocked(useRouter).mockReturnValue({
      ...mockRouter,
      query: { query: initialTerm },
    });

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: initialTerm } });
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
