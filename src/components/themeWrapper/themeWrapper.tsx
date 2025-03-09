import { Provider } from 'react-redux';
import { store } from '../../core/store';
import ThemeSwitcher from '../../components/themeSwitcher/ThemeSwitcher';
import { ThemeProvider } from '../../core/context/ThemeContext';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeSwitcher />
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default ThemeWrapper;
