import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Star★Comics')).toBeInTheDocument();
  });
});