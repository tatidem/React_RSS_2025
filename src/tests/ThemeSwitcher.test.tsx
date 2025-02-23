import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, Mock } from 'vitest';
import ThemeSwitcher from '../comps/ThemeSwitcher';
import useTheme from '../app/context/useTheme';

vi.mock('../app/context/useTheme', () => ({
  default: vi.fn(),
}));

describe('ThemeSwitcher', () => {
  it('renders with light theme and toggles to dark theme', async () => {
    const mockToggleTheme = vi.fn();
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeSwitcher />);
    expect(screen.getByText('Switch to Dark Theme')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    (useTheme as Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeSwitcher />);
    expect(screen.getByText('Switch to Light Theme')).toBeInTheDocument();
  });
});
