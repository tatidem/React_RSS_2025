import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThemeContext, { ThemeProvider } from '../core/context/ThemeContext';

const TestComponent = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div>
            <div data-testid="theme">{theme}</div>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

describe('ThemeContext', () => {
  it('provides initial theme as dark', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('toggles theme between light and dark', async () => {
    render(<TestComponent />);
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    await userEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme').textContent).toBe('light');
    await userEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });
});
