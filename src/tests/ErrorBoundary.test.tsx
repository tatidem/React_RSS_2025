import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../comps/ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Something went wrong. Please try again.')
    ).toBeInTheDocument();
    expect(screen.getByText('Star★Error')).toBeInTheDocument();
    expect(screen.getByText('Reset Error')).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
