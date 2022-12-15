import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../../api/reddit.js';

const initialState = {
  subreddits: [],
  isLoading: false,
  hasError: false
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {
    startGetSubreddits: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    setSubreddits: (state, action) => {
      state.subreddits = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    errorGetSubreddits: (state) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
});

export const { startGetSubreddits, setSubreddits, errorGetSubreddits } = subredditsSlice.actions;

// Redux Thunk to get subreddits.
export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(startGetSubreddits());
    const subreddits = await getSubreddits();
    dispatch(setSubreddits(subreddits));
  } catch (error) {
    dispatch(errorGetSubreddits());
  }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectIsLoading = (state) => state.subreddits.isLoading;
export const selectHasError = (state) => state.subreddits.hasError;

export default subredditsSlice.reducer;