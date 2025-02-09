import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardList from '../comps/CardList';
import { Comic } from '../interfaces';

vi.mock('../comps/Card', () => ({
  default: vi.fn(({ index, comic, onClick }) => (
    <div data-testid="card" onClick={onClick}>
      {index} - {comic.title}
    </div>
  )),
}));

vi.mock('../comps/Nothing', () => ({
  default: vi.fn(({ empty }) => <div data-testid="nothing">{empty ? 'No results' : ''}</div>),
}));

describe('CardList', () => {
  const mockResults: Comic[] = [
    {
      uid: '1',
      title: 'Comic 1',
      publishedYear: 2020,
      publishedMonth: 1,
      publishedDay: 15,
      coverYear: null,
      coverMonth: null,
      coverDay: null,
      numberOfPages: 32,
      stardateFrom: 1234.5,
      stardateTo: 1235.5,
      yearFrom: null,
      yearTo: null,
      photonovel: false,
      adaptation: false,
    },
    {
      uid: '2',
      title: 'Comic 2',
      publishedYear: 2021,
      publishedMonth: 5,
      publishedDay: 20,
      coverYear: null,
      coverMonth: null,
      coverDay: null,
      numberOfPages: 48,
      stardateFrom: 2345.6,
      stardateTo: 2346.6,
      yearFrom: null,
      yearTo: null,
      photonovel: true,
      adaptation: true,
    },
  ];

  it('renders Nothing component when results are empty', () => {
    render(
      <CardList
        results={[]}
        empty={true}
        offset={0}
        onCardClick={vi.fn()}
      />
    );

    const nothingElement = screen.getByTestId('nothing');
    expect(nothingElement).toBeInTheDocument();
    expect(nothingElement).toHaveTextContent('No results');
  });

  it('renders list of Card components when results are provided', () => {
    const mockOffset = 10;
    const mockOnCardClick = vi.fn();

    render(
      <CardList
        results={mockResults}
        empty={false}
        offset={mockOffset}
        onCardClick={mockOnCardClick}
      />
    );

    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(mockResults.length);

    cardElements.forEach((card, index) => {
      expect(card).toHaveTextContent(
        `${mockOffset + index + 1} - ${mockResults[index].title}`
      );
    });
  });

  it('calls onCardClick when a card is clicked', () => {
    const mockOffset = 10;
    const mockOnCardClick = vi.fn();

    render(
      <CardList
        results={mockResults}
        empty={false}
        offset={mockOffset}
        onCardClick={mockOnCardClick}
      />
    );

    const cardElements = screen.getAllByTestId('card');
    cardElements[0].click();

    expect(mockOnCardClick).toHaveBeenCalledWith(mockResults[0].uid);
  });
});