import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedSubreddit: null
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    }
  }
});

export const selectSearchTerm = (state) => state.filter.searchTerm;
export const selectSelectedSubreddit = (state) => state.filter.selectedSubreddit;
export const { setSearchTerm, setSelectedSubreddit } = filterSlice.actions;
export default filterSlice.reducer;