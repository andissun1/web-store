import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError(state, action) {
      return action.payload;
    },
  },
});

export const { reducer, actions } = appSlice;
