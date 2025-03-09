import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

let error = true;
const childComponent = <div>Child Component</div>;
const ErrorComponent = () => {
  if (error) {
    throw new Error('Test error');
  } else {
    return childComponent;
  }
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(<ErrorBoundary>{childComponent}</ErrorBoundary>);
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    vi.spyOn(globalThis.console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    expect(screen.getByText('Star★Error')).toBeInTheDocument();
    expect(screen.getByText('Reset Error')).toBeInTheDocument();
    error = false;
    fireEvent.click(screen.getByText('Reset Error'));
    expect(screen.getByText('Child Component')).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
