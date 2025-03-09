import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PaginationProps } from '../interfaces';
import Pagination from '../components/pagination/Pagination';

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

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('renders the correct page information', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    cleanup();
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
    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with the next page when clicking "Next"', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables the "Previous" button when on the first page', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables the "Next" button when on the last page', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 2 }} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('does not call onPageChange when clicking "Previous" on the first page', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when clicking "Next" on the last page', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 2 }} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when currentPage >= totalPages', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 2, totalItems: 10 }} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when currentPage <= 1', () => {
    render(<Pagination {...{ ...defaultProps, currentPage: 0 }} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
