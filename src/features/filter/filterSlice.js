import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedSubreddit: null
}

// export const addQuizAndQuizId = (quiz) => {
//   return (dispatch) => {
//     dispatch(addQuiz(quiz));
//     dispatch(addQuizIdToTopic({
//       quizId: quiz.id,
//       topicId: quiz.topicId
//     }));
//   } 
// };

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    }
  }
});

export const selectSearchTerm = (state) => state.filter.searchTerm;
export const selectSelectedSubreddit = (state) => state.filter.selectedSubreddit;
export const { setSearchTerm, setSelectedSubreddit } = filterSlice.actions;
export default filterSlice.reducer;