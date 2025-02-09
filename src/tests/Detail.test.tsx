import Detailed from '../pages/detailed';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { getComicDetails } from '../utils/api';
import type { Mock } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock('../utils/api', () => ({
  getComicDetails: vi.fn(),
}));

const uid = 'UID-MOCK';
const query = '?query=test';
const routerPath = `/detailed/${uid}${query}`;

const mockComicDetails = {
  uid,
  title: 'Mock Comic',
  publishedYear: 2023,
  numberOfPages: 32,
  comicSeries: [
    {
      uid: '123',
      title: 'Mock Series',
      publishedYearFrom: 2022,
      publishedYearTo: 2023,
    },
  ],
  writers: [{ uid: '456', name: 'Mock Writer' }],
  artists: [{ uid: '789', name: 'Mock Artist' }],
  publishers: [{ uid: '012', name: 'Mock Publisher' }],
};

vi.mock('../comps/LoadingSpinner', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="loading-spinner">Loading...</div>,
  };
});

describe('Detailed Component', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    pathname: `/detailed/${uid}`,
    search: query,
    hash: '',
    state: null,
    key: 'r4nd0m',
  };

  const memRender = (
    <MemoryRouter initialEntries={[routerPath]}>
      <Routes>
        <Route path="/detailed/:uid" element={<Detailed />} />
      </Routes>
    </MemoryRouter>
  );

  beforeEach(() => {
    (useParams as Mock).mockReturnValue({ uid });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocation as Mock).mockReturnValue(mockLocation);
    (getComicDetails as Mock).mockResolvedValue(mockComicDetails);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loading indicator is displayed while fetching data', async () => {
    render(memRender);
    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  it('detailed card component correctly displays the detailed card data (after loading)', async () => {
    render(memRender);
    await waitFor(() => {
      expect(getComicDetails).toHaveBeenCalledWith(uid);
      expect(screen.getByText(mockComicDetails.title)).toBeInTheDocument();
      expect(
        screen.getByText(`Publication Date: ${mockComicDetails.publishedYear}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Number of Pages: ${mockComicDetails.numberOfPages}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Series')).toBeInTheDocument();
      expect(
        screen.getByText(mockComicDetails.comicSeries[0].title)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Published: ${mockComicDetails.comicSeries[0].publishedYearFrom} - ${mockComicDetails.comicSeries[0].publishedYearTo}`
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Writers')).toBeInTheDocument();
      expect(
        screen.getByText(mockComicDetails.writers[0].name)
      ).toBeInTheDocument();
      expect(screen.getByText('Artists')).toBeInTheDocument();
      expect(
        screen.getByText(mockComicDetails.artists[0].name)
      ).toBeInTheDocument();
      expect(screen.getByText('Publishers')).toBeInTheDocument();
      expect(
        screen.getByText(mockComicDetails.publishers[0].name)
      ).toBeInTheDocument();
    });
  });

  it('calls navigate with correct path on close button click', async () => {
    render(memRender);
    await waitFor(() => {
      expect(getComicDetails).toHaveBeenCalledWith(uid);
    });
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/?query=test', {
      replace: true,
    });
  });

  it('calls handleClose when clicking outside the detailed component', async () => {
    render(memRender);
    await waitFor(() => {
      expect(getComicDetails).toHaveBeenCalledWith(uid);
    });
    fireEvent.mouseDown(document.body);
    fireEvent.mouseUp(document.body);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockNavigate).toHaveBeenCalledWith('/?query=test', {
      replace: true,
    });
  });

  it('does not call handleClose when clicking inside the detailed component', async () => {
    render(memRender);
    await waitFor(() => {
      expect(getComicDetails).toHaveBeenCalledWith(uid);
    });
    const titleElement = screen.getByText(mockComicDetails.title);
    fireEvent.mouseDown(titleElement);
    fireEvent.mouseUp(titleElement);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
