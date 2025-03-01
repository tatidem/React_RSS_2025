import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import ErrorBoundary from './comps/errorBoundary/ErrorBoundary.tsx';
import { store } from '../src/app/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from './app/context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
