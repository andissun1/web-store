import { createSlice } from '@reduxjs/toolkit';
import { goToErrorPage } from './appReducer';
import { request } from '../utils';

const initialState = {
  isLoadingProduct: true,
};

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
    setIsLoadingProduct(state, action) {
      state.isLoadingProduct = action.payload;
    },
  },
});

export const { reducer, actions } = productSlice;

// Асинхронные операции
export const getProduct = (productID) => async (dispatch) => {
  try {
    dispatch(actions.setIsLoadingProduct(true));
    const product = await request(`/api/v1/product/${productID}`);
    dispatch(actions.setProduct(product));
    dispatch(actions.setIsLoadingProduct(false));

    return product;
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};

export const createProduct =
  (productInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingProduct(true));
      const newProduct = await request(`/api/v1/product`, 'POST', productInfo);
      dispatch(actions.setProduct(newProduct));
      dispatch(actions.setIsLoadingProduct(false));

      routes.navigate(`/product/${newProduct._id}`);
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

export const editProduct =
  (productID, productInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingProduct(true));

      const newProduct = await request(
        `/api/v1/product/${productID}`,
        'PATCH',
        productInfo
      );

      dispatch(actions.setProduct(newProduct));
      dispatch(actions.setIsLoadingProduct(false));

      routes.navigate(`/product/${newProduct._id}`);
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

export const deleteProduct =
  (productID) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingProduct(true));
      await request(`/api/v1/product/${productID}`, 'DELETE');
      dispatch(actions.removeProduct());
      dispatch(actions.setIsLoadingProduct(false));

      routes.navigate(`/adminConsole`);
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

// Комментарии (решил попробовать в локальном состоянии компонента хранить данные о комметраниях)
export const addComment = (productID, commentInfo) => async (dispatch) => {
  try {
    const newComment = await request(
      `/api/v1/comments/${productID}`,
      'POST',
      commentInfo
    );

    return newComment;
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};

export const removeComment = (commentID, productID) => async (dispatch) => {
  try {
    await request(`/api/v1/comments/${commentID}/${productID}`, 'DELETE');
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};

export const updateComment = (commentID, commentInfo) => async (dispatch) => {
  try {
    const newComment = await request(
      `/api/v1/comments/${commentID}`,
      'PATCH',
      commentInfo
    );

    return newComment;
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};
