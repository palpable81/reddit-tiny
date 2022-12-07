import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from '../../api/reddit.js';

const initialState = {
  posts: [],
  isLoading: true
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false
    },
  }
});

export const { setPosts } = postsSlice.actions;

// Redux Thunk to get posts from a subreddit.
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    const posts = await getPosts(subreddit);
    dispatch(setPosts(posts));
  } catch (error) {
    console.log(error);
  }
};

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;