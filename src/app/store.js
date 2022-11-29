import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../features/filter/filterSlice';
import postsReducer from '../features/posts/postsSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    posts: postsReducer,
    subreddits: subredditsReducer
  },
});
