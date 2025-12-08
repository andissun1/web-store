import { createSlice } from '@reduxjs/toolkit';
import { actions as productsActions } from './productsReducer';
import { actions as searchActions } from './searchReducer';
import { actions as appActions, goToErrorPage } from './appReducer';
import { request } from '../utils';

const initialState = {
  isLoadingCategories: true,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setIsLoadingCategories(state, action) {
      state.isLoadingCategories = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    removeCategories() {
      return initialState;
    },
  },
});

export const { reducer, actions } = categoriesSlice;

export const getCategory =
  (id, limit, page = 1) =>
  async (dispatch) => {
    try {
      dispatch(actions.setIsLoadingCategories(true));
      let result = await request(
        `/api/v1/category/${id}${limit ? `&limit=${limit}&page=${page}` : ''}`
      );

      dispatch(appActions.removeError());
      dispatch(productsActions.setAllProducts(result));
      dispatch(searchActions.setResult({ ...result, page }));
      dispatch(searchActions.setIsLoadingSearch(false));
      dispatch(actions.setIsLoadingCategories(false));
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(actions.setIsLoadingCategories(true));
    const response = await request('/api/v1/category');
    dispatch(appActions.removeError());
    dispatch(actions.setCategories(response));
    dispatch(actions.setIsLoadingCategories(false));
    return response;
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};
