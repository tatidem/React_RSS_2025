import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Comic } from '../interfaces';
import Card from '@/components/card/Card';

vi.mock('@/core/utils/description', () => ({
  getDescription: vi.fn(() => 'Mocked Description'),
}));

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
  detailsUrl: 'https://example.com/test-comic',
};

const mockOnClick = vi.fn();
const mockOnCheckboxChange = vi.fn();

describe('Card Component', () => {
  it('renders the card with correct data', () => {
    render(
      <Card
        index={1}
        comic={mockComic}
        onClick={mockOnClick}
        isSelected={false}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Test Comic')).toBeInTheDocument();
    expect(screen.getByText('Mocked Description')).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    render(
      <Card
        index={1}
        comic={mockComic}
        onClick={mockOnClick}
        isSelected={false}
        onCheckboxChange={mockOnCheckboxChange}
      />
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
      <Card
        index={1}
        comic={comicWithoutDescription}
        onClick={mockOnClick}
        isSelected={false}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    expect(screen.queryByText('This is a test comic description.')).not.toBeInTheDocument();
  });

  it('renders the checkbox with correct checked state', () => {
    render(
      <Card
        index={1}
        comic={mockComic}
        onClick={mockOnClick}
        isSelected={true}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onCheckboxChange when the checkbox is clicked', () => {
    render(
      <Card
        index={1}
        comic={mockComic}
        onClick={mockOnClick}
        isSelected={false}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnCheckboxChange).toHaveBeenCalled();
  });
});
