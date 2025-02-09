import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../comps/Pagination';
import { PaginationProps } from '../interfaces';

describe('Pagination Component', () => {

  const mockOnPageChange = vi.fn();

  const defaultProps: PaginationProps = {
    currentPage: 1,
    totalItems: 20,
    itemsPerPage: 10,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('renders the correct page information', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();

    render(<Pagination {...{ ...defaultProps, currentPage: 2 }} />);
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();

    render(
      <Pagination
        currentPage={5}
        totalItems={100}
        itemsPerPage={5}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText('Page 5 of 20')).toBeInTheDocument();
  });

  it('calls onPageChange with the previous page when clicking "Previous"', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 2 }} />);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with the next page when clicking "Next"', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables the "Previous" button when on the first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables the "Next" button when on the last page', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 2 }} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('does not call onPageChange when clicking "Previous" on the first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when clicking "Next" on the last page', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 2 }} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});