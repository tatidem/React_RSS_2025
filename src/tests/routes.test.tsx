import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppRoutes } from '../app/routes';

vi.mock('../pages/home', () => ({
  default: () => (
    <div>
      <div>Home Page</div>
      <Outlet />
    </div>
  ),
}));

vi.mock('../pages/detailed', () => ({
  default: () => <div>Detailed Page</div>,
}));

vi.mock('../pages/NotFound', () => ({
  default: () => <div>Not Found Page</div>,
}));

describe('AppRoutes', () => {
  it('renders Home component on the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders Detailed component on the detailed path', () => {
    render(
      <MemoryRouter initialEntries={['/detailed/123']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Detailed Page')).toBeInTheDocument();
  });

  it('renders NotFound component for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
