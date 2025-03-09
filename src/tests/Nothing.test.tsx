import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NothingProps } from '../interfaces';
import Nothing from '@/components/nothing/Nothing';

describe('Nothing', () => {
  it('renders only stars when empty is true', () => {
    const props: NothingProps = {
      empty: true,
    };

    render(<Nothing {...props} />);

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(3);

    const textMessage = screen.queryByText(/Sorry, nothing found/);
    expect(textMessage).not.toBeInTheDocument();
  });

  it('renders stars and text message when empty is false', () => {
    const props: NothingProps = {
      empty: false,
    };

    render(<Nothing {...props} />);

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(6);

    const textMessage = screen.getByText(/Sorry, nothing found/);
    expect(textMessage).toBeInTheDocument();
  });
});
