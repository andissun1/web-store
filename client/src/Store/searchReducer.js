import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils';

const initialState = {
  isLoadingSearch: true,
  searchPhrase: null,
  result: null,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchPhrase(state, action) {
      state.searchPhrase = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setSearchError(state, action) {
      state.error = action.payload;
    },
    setIsLoadingSearch(state, action) {
      state.isLoadingSearch = action.payload;
    },
  },
});

export const { reducer, actions } = appSlice;

export const getSearchResults = (value, limit, page) => async (dispatch) => {
  try {
    dispatch(actions.setIsLoadingSearch(true));
    const resultsOfSearch = await request(
      `/api/v1/filters/search?name=${value}&limit=${limit}&page=${page}`
    );

    dispatch(actions.setSearchError(null));
    dispatch(actions.setSearchPhrase(value));
    dispatch(actions.setResult(resultsOfSearch));
    dispatch(actions.setIsLoadingSearch(false));
  } catch (error) {
    dispatch(actions.setSearchError(error.message));
  }
};
