import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';
import { request } from '../utils';

const initialState = null;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      return action.payload;
    },
    removeProduct() {
      return initialState;
    },
  },
});

export const { reducer, actions } = productSlice;

// Асинхронные операции
export const getProduct =
  (productID) =>
  async (dispatch, getState, { routes }) => {
    try {
      const product = await request(`http://localhost:3005/api/v1/product/${productID}`);
      dispatch(actions.setProduct(product));
      return product;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const createProduct =
  (productInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      console.log(productInfo);
      const newProduct = await request(
        `http://localhost:3005/api/v1/product`,
        'POST',
        productInfo
      );
      dispatch(actions.setProduct(newProduct));
      routes.navigate(`/product/${newProduct._id}`);
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const editProduct =
  (productID, productInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      console.log(productInfo);
      const newProduct = await request(
        `http://localhost:3005/api/v1/product/${productID}`,
        'PATCH',
        productInfo
      );
      dispatch(actions.setProduct(newProduct));
      routes.navigate(`/product/${newProduct._id}`);
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const deleteProduct =
  (productID) =>
  async (dispatch, getState, { routes }) => {
    try {
      await request(`http://localhost:3005/api/v1/product/${productID}`, 'DELETE');
      dispatch(actions.removeProduct());
      routes.navigate(`/adminConsole`);
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };
