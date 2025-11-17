import { createSlice } from '@reduxjs/toolkit';

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

export const getSearchResults =
  (value) =>
  async (dispatch, getState, { server }) => {
    const response = await server.findPhrase(value);
    if (response.error) return dispatch(actions.setSearchError(response.error));
    dispatch(actions.setSearchError(null));
    dispatch(actions.setResult(response.response));
  };
