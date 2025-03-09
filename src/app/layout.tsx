'use client';
import dynamic from 'next/dynamic';
import router from '../routes';
import ThemeWrapper from '@/components/themeWrapper/themeWrapper';
import './globals.css';

const RouterProviderClient = dynamic(
  () => import('react-router-dom').then((mod) => mod.RouterProvider),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          <RouterProviderClient router={router} />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
