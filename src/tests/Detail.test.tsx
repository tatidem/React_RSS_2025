import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach, Mock } from 'vitest';
import { useRouter } from 'next/router';
import Detailed from '@/components/detailed/Detailed';
import { useGetComicDetailsQuery } from '@/core/apiSlice';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/core/apiSlice', () => ({
  useGetComicDetailsQuery: vi.fn(),
}));

const uid = 'UID-MOCK';
const query = '?query=test';

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

describe('Detailed Component', () => {
  const mockPush = vi.fn();
  const mockRouter = {
    pathname: `/detailed/${uid}`,
    query: { uid, query: 'test' },
    push: mockPush,
    route: '/detailed/[uid]',
    asPath: `/detailed/${uid}${query}`,
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loading indicator is displayed while fetching data', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
    });
  });

  it('detailed card component correctly displays the detailed card data (after loading)', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      data: mockComicDetails,
      isLoading: false,
      isError: false,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(useGetComicDetailsQuery).toHaveBeenCalledWith(uid);
      expect(screen.getByText(mockComicDetails.title)).toBeInTheDocument();
      expect(
        screen.getByText(`Publication Date: ${mockComicDetails.publishedYear}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Number of Pages: ${mockComicDetails.numberOfPages}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Series')).toBeInTheDocument();
      expect(screen.getByText(mockComicDetails.comicSeries[0].title)).toBeInTheDocument();
      expect(
        screen.getByText(
          `Published: ${mockComicDetails.comicSeries[0].publishedYearFrom} - ${mockComicDetails.comicSeries[0].publishedYearTo}`
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Writers')).toBeInTheDocument();
      expect(screen.getByText(mockComicDetails.writers[0].name)).toBeInTheDocument();
      expect(screen.getByText('Artists')).toBeInTheDocument();
      expect(screen.getByText(mockComicDetails.artists[0].name)).toBeInTheDocument();
      expect(screen.getByText('Publishers')).toBeInTheDocument();
      expect(screen.getByText(mockComicDetails.publishers[0].name)).toBeInTheDocument();
    });
  });

  it('calls navigate with correct path on close button click', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      data: mockComicDetails,
      isLoading: false,
      isError: false,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(useGetComicDetailsQuery).toHaveBeenCalledWith(uid);
    });
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { query: 'test', uid: 'UID-MOCK' },
    });
  });

  it('calls handleClose when clicking outside the detailed component', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      data: mockComicDetails,
      isLoading: false,
      isError: false,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(useGetComicDetailsQuery).toHaveBeenCalledWith(uid);
    });
    fireEvent.mouseDown(document.body);
    fireEvent.mouseUp(document.body);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { query: 'test', uid: 'UID-MOCK' },
    });
  });

  it('does not call handleClose when clicking inside the detailed component', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      data: mockComicDetails,
      isLoading: false,
      isError: false,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(useGetComicDetailsQuery).toHaveBeenCalledWith(uid);
    });
    const titleElement = screen.getByText(mockComicDetails.title);
    fireEvent.mouseDown(titleElement);
    fireEvent.mouseUp(titleElement);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('render error loading comic details', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      isError: true,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(screen.getByText('Error loading comic details.')).toBeInTheDocument();
    });
  });

  it('render no data found', async () => {
    (useGetComicDetailsQuery as Mock).mockReturnValue({
      data: null,
    });
    render(<Detailed />);
    await waitFor(() => {
      expect(screen.getByText('No comic data found.')).toBeInTheDocument();
    });
  });
});
