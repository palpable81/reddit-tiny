import { createSlice } from '@reduxjs/toolkit';
import { getComments } from '../../api/reddit.js';

const initialState = {
  comments: []
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    addComments: (state, action) => {
      state.comments[action.payload.postId] = action.payload.comments;
    },
  }
});

export const { addComments } = commentsSlice.actions;

// Redux Thunk to get comments from a post
export const fetchComments = (post) => async (dispatch) => {
  try {
    const comments = await getComments(post);
    dispatch(addComments({postId: post.id, comments: comments}));
  } catch (error) {
    console.log(error);
  }
};

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;