import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      console.log('Updating searchTerm to:', action.payload);
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
