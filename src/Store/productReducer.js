import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';

const initialState = {
  id: null,
  name: null,
  description: null,
  price: null,
  stock_quantity: null,
  image_URL: null,
  category_id: null,
  comments: null,
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
    setAllProducts(state, action) {
      state.allProducts = action.payload;
    },
  },
});

export const { reducer, actions } = productSlice;

// Асинхронные операции
export const getProduct = (productID) => async (dispatch, getState, extraArg) => {
  const { server, routes } = extraArg;
  const { response, error } = await server.fetchProduct(productID);
  if (error) {
    dispatch(appActions.setError(error));
    routes.navigate('/error');
    return;
  }

  dispatch(actions.setProduct(response));
  return response;
};

export const getAllProducts =
  () =>
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllProducts(hash);
    if (error) return error;
    dispatch(actions.setAllProducts(response));
  };
