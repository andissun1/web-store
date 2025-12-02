import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';
import { request } from '../utils';

const initialState = null;

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
    dispatch(appActions.setError(error.message));
    routes.navigate('/error');
  }
};
