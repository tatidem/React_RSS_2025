import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../comps/searchBar/SearchBar';
import searchReducer from '../app/searchSlice';
import selectedItemsReducer from '../app/selectedItemsSlice';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
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
  const mockSetSearchParams = vi.fn();
  const mockSearchParams = (searchTerm: string) => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ query: searchTerm }),
      mockSetSearchParams,
    ]);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    const store = createTestStore();
    mockSearchParams('');

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
    mockSearchParams('');

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
    mockSearchParams('test query');

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
      expect(mockSetSearchParams).toHaveBeenCalledWith({ query: 'test query', page: '1' });
      expect(store.getState().search.searchTerm).toBe('test query');
    });
  });

  it('syncs searchTerm from Redux with query state on mount', async () => {
    const initialTerm = 'initial term';
    const store = createTestStore({
      search: { searchTerm: initialTerm },
      selectedItems: { items: [] },
    });
    mockSearchParams(initialTerm);
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
    mockSearchParams(initialTerm);

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
      expect(mockSetSearchParams).not.toHaveBeenCalled();
    });
  });
});
