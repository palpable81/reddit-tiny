import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../../api/reddit.js';

const initialState = {
  subreddits: [],
  isLoading: false
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {
    startGetSubreddits: (state) => {
      state.isLoading = true;
    },
    setSubreddits: (state, action) => {
      state.subreddits = action.payload;
      state.isLoading = false;
    },
  }
});

export const { startGetSubreddits, setSubreddits } = subredditsSlice.actions;

// Redux Thunk to get subreddits.
export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(startGetSubreddits());
    const subreddits = await getSubreddits();
    dispatch(setSubreddits(subreddits));
  } catch (error) {
    console.log(error);
  }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectIsLoading = (state) => state.subreddits.isLoading;

export default subredditsSlice.reducer;