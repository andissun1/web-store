import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils';

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

export const getAllProducts = () => async (dispatch, getState) => {
  try {
    const products = await request(`http://localhost:3005/api/v1/product`);
    dispatch(actions.setAllProducts(products));
  } catch (error) {
    console.log(error.message);
  }
};
