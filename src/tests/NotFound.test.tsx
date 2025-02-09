import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  it('renders the 404 heading', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', { name: /404 - Not Found/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the not found message', () => {
    render(<NotFound />);

    const message = screen.getByText(/The page you are looking for does not exist./i);
    expect(message).toBeInTheDocument();
  });
});