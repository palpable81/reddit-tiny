import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from '../../api/reddit.js';

const initialState = {
  posts: [],
  isLoading: false
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    startGetPosts: (state, action) => {
      state.posts = null;
      state.isLoading = true;
    }
  }
});

export const { setPosts, startGetPosts } = postsSlice.actions;

// Redux Thunk to get posts from a subreddit.
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts);
    const posts = await getPosts(subreddit);
    dispatch(setPosts(posts));
  } catch (error) {
    console.log(error);
  }
};

export const selectPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;

export default postsSlice.reducer;