import { Links, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Provider } from 'react-redux';
import ThemeWrapper from '../components/themeWrapper/themeWrapper';
import { store } from '../core/store';
import './app.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <base href="/" />
        <Links />
        <link rel="icon" type="image/svg+xml" href="/star.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Star★Comics</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Outlet />
      </ThemeWrapper>
    </Provider>
  );
}
