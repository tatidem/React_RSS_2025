import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { generateMockData } from './utils/generateMockData';
import CardList from '@/components/cardList/CardList';
import { ITEMS_PER_PAGE } from '@/core/constants';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/components/card/Card', () => ({
  default: vi.fn(({ index, comic, onClick, isSelected, onCheckboxChange }) => (
    <div data-testid="card" onClick={onClick}>
      {index} - {comic.title}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onCheckboxChange}
        data-testid={`checkbox-${comic.uid}`}
      />
    </div>
  )),
}));

vi.mock('@/components/nothing/Nothing', () => ({
  default: vi.fn(({ empty }) => <div data-testid="nothing">{empty ? 'No results' : ''}</div>),
}));

describe('CardList', async () => {
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

  const mockSearchParams = new URLSearchParams('page=1');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as ReadonlyURLSearchParams);
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        search: { searchTerm: '' },
        selectedItems: { items: [] },
      })
    );
  });

  it('renders Nothing component when results are empty', () => {
    render(<CardList data={undefined} />);
    const nothingElement = screen.getByTestId('nothing');
    expect(nothingElement).toBeInTheDocument();
    expect(nothingElement).toHaveTextContent('No results');
  });

  it('renders list of Card components when results are provided', () => {
    const mockData = generateMockData();
    render(<CardList data={mockData} />);
    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(mockData.comics.length);
    cardElements.forEach((card, index) => {
      expect(card).toHaveTextContent(`${index + 1} - ${mockData.comics[index].title}`);
    });
  });

  it('calls handleCardClick when a card is clicked', () => {
    const mockData = generateMockData();
    render(<CardList data={mockData} />);
    const cardElements = screen.getAllByTestId('card');
    fireEvent.click(cardElements[0]);
    expect(mockPush).toHaveBeenCalledWith('/detailed/1?page=1');
  });

  it('does not call handleCardClick when a card is clicked on the detailed page', () => {
    cleanup();
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/detailed/1',
      },
      writable: true,
    });
    const mockData = generateMockData();
    render(<CardList data={mockData} />);
    const cardElements = screen.getAllByTestId('card');
    fireEvent.click(cardElements[0]);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('dispatches addItem action when a checkbox is unchecked', () => {
    const mockData = generateMockData();
    render(<CardList data={mockData} />);
    const checkbox = screen.getByTestId('checkbox-1');
    fireEvent.click(checkbox, { target: { checked: false } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'selectedItems/addItem', payload: '1' });
  });

  it('dispatches removeItem action when a checkbox is checked', () => {
    const mockData = generateMockData();
    render(<CardList data={mockData} />);
    const checkbox = screen.getByTestId('checkbox-1');
    fireEvent.click(checkbox, { target: { checked: true } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'selectedItems/removeItem', payload: '1' });
  });

  it('renders pagination only when items exceed ITEMS_PER_PAGE', () => {
    const mockData = generateMockData(ITEMS_PER_PAGE + 1);
    render(<CardList data={mockData} />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  it('calls handlePageChange when pagination is changed', () => {
    const mockData = generateMockData(ITEMS_PER_PAGE + 1);
    render(<CardList data={mockData} />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('?page=2');
  });
});
