import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '../comps/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner container', () => {
    render(<LoadingSpinner />);

    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('renders the spinner element', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders the spinner circle', () => {
    render(<LoadingSpinner />);

    const spinnerCircle = screen.getByTestId('spinner-circle');
    expect(spinnerCircle).toBeInTheDocument();
  });

  it('renders the loading text', () => {
    render(<LoadingSpinner />);

    const spinnerText = screen.getByText('Loading');
    expect(spinnerText).toBeInTheDocument();
  });
});
