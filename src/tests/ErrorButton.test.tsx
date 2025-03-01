import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorButton } from '../comps/errorButton/ErrorButton';

describe('ErrorButton', () => {
  it('renders the button', () => {
    render(<ErrorButton />);
    const button = screen.getByText('Error Button');
    expect(button).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const consoleErrorMock = vi.spyOn(globalThis.console, 'error').mockImplementation(() => {});
    try {
      render(<ErrorButton />);
      const button = screen.getByText('Error Button');
      fireEvent.click(button);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const typedError = error as Error;
      expect(typedError.message).toBe('Something went wrong...');
    }
    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });
});
