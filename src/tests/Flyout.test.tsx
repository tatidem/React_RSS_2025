import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../core/selectedItemsSlice';
import { generateMockData } from './utils/generateMockData';
import Flyout from '@/components/flyout/Flyout';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: vi.fn(),
  };
});

vi.mock('../core/utils/downloadCSV.ts', () => ({
  downloadCSV: vi.fn(),
}));

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
    const store = createTestStore({ items: ['1', '2', '3'] });
    const mockData = generateMockData(5);

    render(
      <Provider store={store}>
        <Flyout data={mockData} />
      </Provider>
    );

    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Download'));
    const { downloadCSV } = await import('../core/utils/downloadCSV');
    expect(downloadCSV).toHaveBeenCalledWith(mockData, ['1', '2', '3'], expect.any(Function));

    await userEvent.click(screen.getByText('Unselect all'));
    const state = store.getState();
    expect(state.selectedItems.items).toEqual([]);
  });

  it('render when no items are selected', () => {
    const store = createTestStore({ items: [] });
    const mockData = generateMockData(3);

    render(
      <Provider store={store}>
        <Flyout data={mockData} />
      </Provider>
    );

    expect(screen.queryByText(/items are selected/)).not.toBeInTheDocument();
  });

  it('triggers download link when downloadUrl is set', async () => {
    const store = createTestStore({ items: ['1', '2', '3'] });
    const mockData = generateMockData(3);
    const { downloadCSV } = await import('../core/utils/downloadCSV');
    vi.mocked(downloadCSV).mockImplementation((_data, _selectedItems, setDownloadUrl) => {
      setDownloadUrl('mock-url');
    });
    render(
      <Provider store={store}>
        <Flyout data={mockData} />
      </Provider>
    );

    await userEvent.click(screen.getByText('Download'));
    const downloadLink = await screen.findByRole('link', { hidden: true });
    expect(downloadLink).toHaveAttribute('href', 'mock-url');
    expect(downloadLink).toHaveAttribute('download', '3_episodes.csv');
  });
});
