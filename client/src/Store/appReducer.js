import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils';

const initialState = {
  errors: null,
  search: { searchPhrase: null, result: null, error: null },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError(state, action) {
      state.errors = action.payload;
    },
    removeError(state, action) {
      state.errors = null;
    },
    setSearchPhrase(state, action) {
      state.search.searchPhrase = action.payload;
    },
    setResult(state, action) {
      state.search.result = action.payload;
    },
    setSearchError(state, action) {
      state.search.error = action.payload;
    },
  },
});

export const { reducer, actions } = appSlice;

export const getSearchResults = (value, limit, page) => async (dispatch) => {
  try {
    const resultsOfSearch = await request(
      `http://localhost:3005/api/v1/filters/search?name=${value}&limit=${limit}&page=${page}`
    );

    dispatch(actions.setSearchError(null));
    dispatch(actions.setSearchPhrase(value));
    dispatch(actions.setResult(resultsOfSearch));
  } catch (error) {
    dispatch(actions.setSearchError(error.message));
  }
};
