import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../comps/Card';
import { Comic } from '../interfaces';

// Моковые данные для тестов
const mockComic: Comic = {
  uid: '1',
  title: 'Test Comic',
  publishedYear: 2023,
  publishedMonth: 10,
  publishedDay: 5,
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
  description: 'This is a test comic description.',
};

const mockOnClick = vi.fn();

describe('Card Component', () => {
  it('renders the card with correct data', () => {
    render(
      <Card index={1} comic={mockComic} onClick={mockOnClick} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByText('Test Comic')).toBeInTheDocument();

    // expect(screen.getByText('This is a test comic description.')).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    render(
      <Card index={1} comic={mockComic} onClick={mockOnClick} />
    );

    fireEvent.click(screen.getByRole('article'));

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders the card without description if description is not provided', () => {
    const comicWithoutDescription: Comic = {
      ...mockComic,
      description: undefined,
    };

    render(
      <Card index={1} comic={comicWithoutDescription} onClick={mockOnClick} />
    );

    expect(screen.queryByText('This is a test comic description.')).not.toBeInTheDocument();
  });
});