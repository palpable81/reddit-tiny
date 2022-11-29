import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../../api/reddit.js';

const initialState = {
  subreddits: []
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {
    setSubreddits: (state, action) => {
      state.subreddits = action.payload;
    },
  }
});

export const { setSubreddits } = subredditsSlice.actions;

// Redux Thunk to get subreddits.
export const fetchSubreddits = () => async (dispatch) => {
  try {
    const subreddits = await getSubreddits();
    dispatch(setSubreddits(subreddits));
  } catch (error) {
    console.log(error);
  }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;

export default subredditsSlice.reducer;