// main.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../app/context/ThemeContext';
import ErrorBoundary from '../comps/ErrorBoundary';
import App from '../app/App';
import { store } from '../app/store';

describe('Main App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    );
    expect(container).toBeDefined();
  });

  it('renders App component inside Provider and ThemeProvider', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    );
    expect(getByText(/Comics/i)).toBeInTheDocument();
  });
});
