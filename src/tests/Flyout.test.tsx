import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../comps/Flyout';
import selectedItemsReducer from '../app/selectedItemsSlice';

const createTestStore = (initialState: { items: string[] } = { items: [] }) => {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    preloadedState: {
      selectedItems: initialState,
    },
  });
};

describe('Flyout', () => {
  it('renders selected count and handles button clicks', async () => {
    const mockOnDownload = vi.fn();
    const store = createTestStore({ items: ['item1', 'item2', 'item3'] });

    render(
      <Provider store={store}>
        <Flyout selectedCount={3} onDownload={mockOnDownload} reset={false} />
      </Provider>
    );

    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Unselect all'));

    const state = store.getState();
    expect(state.selectedItems.items).toEqual([]);

    await userEvent.click(screen.getByText('Download'));
    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it('resets selected items when reset prop is true', () => {
    const mockOnDownload = vi.fn();
    const store = createTestStore({ items: ['item1', 'item2', 'item3'] });

    const { rerender } = render(
      <Provider store={store}>
        <Flyout selectedCount={3} onDownload={mockOnDownload} reset={false} />
      </Provider>
    );

    expect(screen.getByText('3 items are selected')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <Flyout selectedCount={3} onDownload={mockOnDownload} reset={true} />
      </Provider>
    );

    const state = store.getState();
    expect(state.selectedItems.items).toEqual([]);
  });
});
