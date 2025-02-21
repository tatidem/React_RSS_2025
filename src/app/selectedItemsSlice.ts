import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  items: string[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;