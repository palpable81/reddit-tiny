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
        isVisible: true
      }
    },
    addCommentsSuccess: (state, action) => {
      state[action.payload.post.id] = {
        comments: action.payload.comments,
        isLoading: false,
        isLoaded: true,
        isVisible: true
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

export const { startAddComments, addCommentsSuccess, toggleComments } = commentsSlice.actions;

// Redux Thunk to get comments from a post
export const fetchComments = (post) => async (dispatch) => {
  try {
    dispatch(startAddComments(post));
    
    const comments = await getComments(post);

    dispatch(addCommentsSuccess({post: post, comments: comments}));
  } catch (error) {
    console.log(error);
  }
};

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;