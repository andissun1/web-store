import { createSlice } from '@reduxjs/toolkit';
import { actions as productsActions } from './productsReducer';
import { actions as appActions } from './appReducer';

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

export const getAllProducts =
  () =>
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllProducts(hash);
    if (error) return console.log(error);
    dispatch(actions.setAllProducts(response));
  };

export const getCategory =
  (id) =>
  async (dispatch, getState, { server }) => {
    const response = await server.getCategory(id);
    if (response.error) return dispatch(appActions.setError(response.error));
    dispatch(appActions.removeError());
    dispatch(productsActions.setAllProducts(response.response));
  };

export const getCategories =
  () =>
  async (dispatch, getState, { server }) => {
    const response = await server.getCategories();
    if (response.error) return dispatch(appActions.setError(response.error));
    dispatch(appActions.removeError());
    dispatch(actions.setCategories(response.response));
  };

export const sortCollection =
  (id, sortType) =>
  async (dispatch, getState, { server }) => {
    const response = await server.sortCollection(id, sortType);
    if (response.error) return dispatch(appActions.setError(response.error));
    dispatch(appActions.removeError());
    dispatch(productsActions.setAllProducts(response.response));
  };
