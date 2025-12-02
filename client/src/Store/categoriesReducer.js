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

export const getCategory =
  (id, limit, page) =>
  async (dispatch, getState, { routes }) => {
    try {
      let { products, lastPage, count } = await request(
        `http://localhost:3005/api/v1/category/${id}${
          limit ? `&limit=${limit}&page=${page}` : ''
        }`
      );

      dispatch(appActions.removeError());
      dispatch(productsActions.setAllProducts(products));

      return {
        lastPage,
        count,
        products,
      };
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
