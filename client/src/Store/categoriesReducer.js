import { createSlice } from '@reduxjs/toolkit';
import { actions as productsActions } from './productsReducer';
import { actions as appActions } from './appReducer';
import { request } from '../utils';

const initialState = null;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      return action.payload;
    },

    removeCategories() {
      return initialState;
    },
  },
});

export const { reducer, actions } = categoriesSlice;

export const getAllProducts = () => async (dispatch, getState) => {
  try {
    const products = request(`http://localhost:3005/api/v1/product`);
    dispatch(actions.setAllProducts(products));
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategory =
  (id) =>
  async (dispatch, getState, { routes }) => {
    try {
      const response = await request(`http://localhost:3005/api/v1/category/${id}`);
      dispatch(appActions.removeError());

      dispatch(productsActions.setAllProducts(response));
      return response;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const getCategories =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      const response = await request('http://localhost:3005/api/v1/category');
      dispatch(appActions.removeError());
      dispatch(actions.setCategories(response));
      return response;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const sortCollection = (id, sortType) => async (dispatch, getState) => {
  // Сделать сортировку
  // const response = await server.sortCollection(id, sortType);
  // if (response.error) return dispatch(appActions.setError(response.error));
  // dispatch(appActions.removeError());
  // dispatch(productsActions.setAllProducts(response.response));
};
