import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../features/filter/filterSlice';
//import quizzesReducer from '../features/quizzes/quizzesSlice';
//import cardsReducer from '../features/cards/cardsSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    //quizzes: quizzesReducer,
    //cards: cardsReducer
  },
});
