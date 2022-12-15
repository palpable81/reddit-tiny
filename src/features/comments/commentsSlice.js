import { createSlice } from '@reduxjs/toolkit';
import { getComments } from '../../api/reddit.js';

const initialState = {
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    startAddComments: (state, action) => {
      state[action.payload.id] = {
        comments: [],
        isLoading: true,
        isLoaded: false,
        isVisible: true,
        hasError: false
      }
    },
    addCommentsSuccess: (state, action) => {
      state[action.payload.post.id] = {
        comments: action.payload.comments,
        isLoading: false,
        isLoaded: true,
        isVisible: true,
        hasError: false
      }
    },
    errorAddComments: (state, action) => {
      state[action.payload.id] = {
        isLoading: false,
        isLoaded: false,
        isVisible: true,
        hasError: true
      }
    },
    toggleComments: (state, action) => {
      state[action.payload.id] = {
        ...state[action.payload.id],
        isVisible: !state[action.payload.id].isVisible
      }
    }
  }
});

export const { startAddComments, addCommentsSuccess, errorAddComments, toggleComments } = commentsSlice.actions;

// Redux Thunk to get comments from a post
export const fetchComments = (post) => async (dispatch) => {
  try {
    dispatch(startAddComments(post));
    
    const comments = await getComments(post);

    dispatch(addCommentsSuccess({post: post, comments: comments}));
  } catch (error) {
    dispatch(errorAddComments(post));
  }
};

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;