import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '@/components/searchBar/SearchBar';
import { setSearchTerm } from '@/core/searchSlice';
import { unselectAll } from '@/core/selectedItemsSlice';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe('SearchBar Component', () => {
  const mockDispatch = vi.fn();
  const mockPush = vi.fn();
  const mockRouter = {
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockSearchParams = new URLSearchParams('query=test&page=1');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as ReadonlyURLSearchParams);
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        search: { searchTerm: 'test' },
        selectedItems: { items: [] },
      })
    );
  });

  it('renders the search input and button', () => {
    render(<SearchBar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates the query state on input change', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new query' } });
    expect(input).toHaveValue('new query');
  });

  it('calls handleSearch with the trimmed query on button click', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '  new query  ' } });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(setSearchTerm('new query'));
    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
    expect(mockPush).toHaveBeenCalledWith('?query=new+query&page=1');
  });

  it('does not call handleSearch if the query is the same as the searchTerm', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(mockDispatch).not.toHaveBeenCalledWith(setSearchTerm('test'));
    expect(mockDispatch).not.toHaveBeenCalledWith(unselectAll());
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('sets the initial query from searchParams', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
  });

  it('updates the query state when searchTerm changes', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        search: { searchTerm: 'updated' },
        selectedItems: { items: [] },
      })
    );
    render(<SearchBar />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('updated');
  });
});
