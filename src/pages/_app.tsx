import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '@/core/store';
import ThemeSwitcher from '@/components/themeSwitcher/ThemeSwitcher';
import { ThemeProvider } from '@/core/context/ThemeContext';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import './styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <ThemeSwitcher />
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}
