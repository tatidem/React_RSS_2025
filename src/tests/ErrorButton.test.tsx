import { ErrorButton } from '@/components/errorButton/ErrorButton';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ErrorBoundarySimple from './utils/ErrorBoundarySimple';

describe('ErrorButton', () => {
  it('renders the button', () => {
    render(<ErrorButton />);
    const button = screen.getByText('Error Button');
    expect(button).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', async () => {
    let caughtError: Error | null = null;
    vi.spyOn(globalThis.console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundarySimple onError={(error) => (caughtError = error)}>
        <ErrorButton />
      </ErrorBoundarySimple>
    );
    const button = screen.getByText('Error Button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(caughtError).toBeInstanceOf(Error);
    expect((caughtError as unknown as Error).message).toBe('Something went wrong...');
  });
});
