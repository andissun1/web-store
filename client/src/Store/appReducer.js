import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: null,
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
  },
});

export const { reducer, actions } = appSlice;

export const goToErrorPage =
  (message) =>
  (dispatch, getState, { routes }) => {
    dispatch(actions.setError(message));
    routes.navigate('/error');
  };
