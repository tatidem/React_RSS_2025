import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../comps/SearchBar';

describe('SearchBar Component', () => {

  it('renders without errors', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders with the initial value', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} initialValue="initial search" />);
    expect(screen.getByRole('textbox')).toHaveValue('initial search');
  });

  it('updates the input value when typing', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new search' } });
    expect(inputElement).toHaveValue('new search');
  });

  it('calls onSearch with the current input value when clicking "Search"', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test search' } });

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('calls onSearch with the trimmed input value', () => {
        const mockOnSearch = vi.fn();
        render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: '  test search  ' } });

        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith('  test search  ');
    });

    it('calls onSearch with initialValue if search button is clicked without changing input', () => {
        const mockOnSearch = vi.fn();
        render(<SearchBar onSearch={mockOnSearch} initialValue="initial search" />);

        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith('initial search');
    });

});