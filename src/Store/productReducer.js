import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';

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
export const getProduct = (productID) => async (dispatch, getState, extraArg) => {
  const { server, routes } = extraArg;
  const { response, error } = await server.fetchProduct(productID);
  if (error) {
    dispatch(appActions.setError(error));
    routes.navigate('/error');
  } else dispatch(actions.setProduct(response));

  return response;
};

export const createProduct =
  (productInfo) =>
  async (dispatch, getState, { server, routes }) => {
    console.log(productInfo);

    const hash = getState().user.hash;
    const { response, error } = await server.createProduct(hash, productInfo);
    if (error) {
      dispatch(appActions.setError(error));
      routes.navigate('/error');
    } else {
      dispatch(actions.setProduct(response));
      routes.navigate(`/product/${response.id}`);
    }
  };

export const deleteProduct =
  (productID) =>
  async (dispatch, getState, { server, routes }) => {
    const hash = getState().user.hash;
    const { error } = await server.deleteProduct(hash, productID);
    if (error) {
      dispatch(appActions.setError(error));
      routes.navigate('/error');
    } else {
      dispatch(actions.removeProduct());
      routes.navigate(`/adminConsole`);
    }
  };
