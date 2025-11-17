import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts(state, action) {
      return action.payload;
    },

    removeProducts() {
      return initialState;
    },
  },
});

export const { reducer, actions } = productsSlice;

export const getAllProducts =
  () =>
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllProducts(hash);
    if (error) return error;
    dispatch(actions.setAllProducts(response));
  };
