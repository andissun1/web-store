import { createSlice } from '@reduxjs/toolkit';
import { goToErrorPage } from './appReducer';
import { request } from '../utils';

const initialState = {
  isLoadingProducts: true,
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts(state, action) {
      state.products = action.payload;
    },
    removeProducts() {
      return initialState;
    },
    setIsLoadingProducts(state, action) {
      state.isLoadingProducts = action.payload;
    },
  },
});

export const { reducer, actions } = productsSlice;

export const getAllProducts = () => async (dispatch, getState) => {
  try {
    dispatch(actions.setIsLoadingProducts(true));
    const products = await request(`/api/v1/product`);
    dispatch(actions.setAllProducts(products));
    dispatch(actions.setIsLoadingProducts(false));
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};
