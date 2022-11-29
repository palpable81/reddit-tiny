import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../features/filter/filterSlice';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    posts: postsReducer,
    //cards: cardsReducer
  },
});
