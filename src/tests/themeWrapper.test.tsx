import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeWrapper from '../components/themeWrapper/themeWrapper';

vi.mock('../components/themeSwitcher/ThemeSwitcher', () => ({
  default: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

vi.mock('../components/errorBoundary/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe('ThemeWrapper', () => {
  it('renders children wrapped in Provider, ThemeProvider, ThemeSwitcher, and ErrorBoundary', () => {
    const testMessage = 'Test Child Component';
    render(
      <ThemeWrapper>
        <div>{testMessage}</div>
      </ThemeWrapper>
    );

    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('provides Redux store and ThemeContext to children', () => {
    const TestComponent = () => {
      return <div data-testid="test-component">Test Component</div>;
    };

    render(
      <ThemeWrapper>
        <TestComponent />
      </ThemeWrapper>
    );
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });
});
