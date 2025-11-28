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

// Комментарии (решил попробовать в локальном состоянии компонента хранить данные о комметраниях)
export const addComment =
  (productID, commentInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      const newComment = await request(
        `http://localhost:3005/api/v1/comments/${productID}`,
        'POST',
        commentInfo
      );
      return newComment;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const removeComment =
  (commentID, productID) =>
  async (dispatch, getState, { routes }) => {
    try {
      await request(
        `http://localhost:3005/api/v1/comments/${commentID}/${productID}`,
        'DELETE'
      );
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const updateComment =
  (commentID, commentInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      const newComment = await request(
        `http://localhost:3005/api/v1/comments/${commentID}`,
        'PATCH',
        commentInfo
      );
      return newComment;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };
