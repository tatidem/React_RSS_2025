import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import Home from '../pages/home';
import { useSearchComicsQuery } from '../app/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  useSearchParams,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../app/apiSlice', () => ({
  useSearchComicsQuery: vi.fn(),
}));

vi.mock('../comps/SearchBar', () => {
  return {
    __esModule: true,
    default: vi.fn(() => (
      <div data-testid="mock-search-bar">
        Mock Search Bar
        <input data-testid="mock-search-input" type="text" value=""></input>
      </div>
    )),
  };
});

vi.mock('../comps/CardList', () => {
  return {
    __esModule: true,
    default: vi.fn(({ results }) => (
      <div data-testid="mock-card-list">
        Mock Card List - {results.length} items
      </div>
    )),
  };
});

vi.mock('../comps/Pagination', () => {
  return {
    __esModule: true,
    default: vi.fn(() => (
      <div data-testid="mock-pagination">Mock Pagination</div>
    )),
  };
});

vi.mock('../comps/LoadingSpinner', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="loading-spinner">Loading...</div>,
  };
});

describe('Home Component', () => {
  const mockNavigate = vi.fn();
  const mockSearchParams = new URLSearchParams();
  const mockSetSearchParams = vi.fn();
  const mockComicsData = {
    comics: [
      { uid: '1', title: 'Comic 1' },
      { uid: '2', title: 'Comic 2' },
    ],
  };
  const mockLocation = {
    pathname: '/',
    search: '?query=test',
    hash: '',
    state: null,
    key: 'r4nd0m',
  };
  const memRender = (
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useSearchParams as Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useParams as Mock).mockReturnValue({});
    (useLocation as Mock).mockReturnValue(mockLocation);
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        search: { searchTerm: 'mockSearchTerm' },
        selectedItems: { items: [] },
      })
    );
    (useDispatch as unknown as Mock).mockReturnValue(vi.fn());
  });

  it('renders header and mock SearchBar', () => {
    (useSearchComicsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    render(memRender);
    expect(screen.getByText('Star★Comics')).toBeInTheDocument();
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
  });

  it('shows loading spinner while loading', () => {
    (useSearchComicsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(memRender);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('fetches comics and renders CardList after loading', async () => {
    (useSearchComicsQuery as Mock).mockReturnValue({
      data: mockComicsData,
      isLoading: false,
      isError: false,
    });
    render(memRender);
    await waitFor(() => {
      expect(useSearchComicsQuery).toHaveBeenCalledWith('mockSearchTerm');
      expect(screen.getByTestId('mock-card-list')).toBeInTheDocument();
      expect(screen.getByText('Mock Card List - 2 items')).toBeInTheDocument();
    });
  });

  it('fetches comics and renders CardList after loading if result is empty', async () => {
    (useSearchComicsQuery as Mock).mockReturnValue({
      data: { comics: [] },
      isLoading: false,
      isError: false,
    });
    render(memRender);
    await waitFor(() => {
      expect(useSearchComicsQuery).toHaveBeenCalledWith('mockSearchTerm');
      expect(screen.getByTestId('mock-card-list')).toBeInTheDocument();
      expect(screen.getByText('Mock Card List - 0 items')).toBeInTheDocument();
    });
  });

  it('renders Pagination when there are more comics than ITEMS_PER_PAGE', async () => {
    const moreMockComicsData = {
      comics: Array(15).fill({ uid: '1', title: 'Comic 1' }),
    };
    (useSearchComicsQuery as Mock).mockReturnValue({
      data: moreMockComicsData,
      isLoading: false,
      isError: false,
    });
    render(memRender);
    await waitFor(() => {
      expect(useSearchComicsQuery).toHaveBeenCalledWith('mockSearchTerm');
    });
    await waitFor(() => {
      expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
    });
  });

  it('displays an error message when fetching comics fails', async () => {
    (useSearchComicsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: 'Failed to fetch comics',
    });
    render(memRender);
    await waitFor(() => {
      expect(useSearchComicsQuery).toHaveBeenCalledWith('mockSearchTerm');
      expect(screen.getByText('Failed to fetch comics')).toBeInTheDocument();
    });
  });
});
