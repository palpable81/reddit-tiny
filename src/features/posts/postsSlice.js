import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from '../../api/reddit.js';

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    startGetPosts: (state) => {
      state.posts = [];
      state.isLoading = true;
      state.hasError = false;
    },
    errorGetPosts: (state) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
});

export const { setPosts, startGetPosts, errorGetPosts } = postsSlice.actions;

// Redux Thunk to get posts from a subreddit.
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getPosts(subreddit);
    dispatch(setPosts(posts));
  } catch (error) {
    console.log(error);
    dispatch(errorGetPosts());
  }
};

export const selectPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectHasError = (state) => state.posts.hasError;

export default postsSlice.reducer;