import { createSlice } from '@reduxjs/toolkit';
import { goToErrorPage } from './appReducer';
import { request } from '../utils';

const initialState = {
  isLoadingOrder: true,
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setIsLoadingfOrder(state, action) {
      state.isLoadingOrder = action.payload;
    },
    setOrderInfo(state, action) {
      return action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    removeOrder() {
      return initialState;
    },
  },
});

export const { reducer, actions } = orderReducer;

export const getOrder =
  (id) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingfOrder(true));
      const order = await request(`/api/v1/order/${id}`);

      dispatch(actions.setOrderInfo(order));
      dispatch(actions.setIsLoadingfOrder(false));
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

export const getAllOrders =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingfOrder(true));
      const orders = await request(`/api/v1/order`);
      dispatch(actions.setOrders(orders));
      dispatch(actions.setIsLoadingfOrder(false));
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

export const createOrder =
  (orderInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingfOrder(true));
      const newOrder = await request(`/api/v1/order`, 'POST', orderInfo);
      dispatch(actions.setOrderInfo(newOrder));
      dispatch(actions.setIsLoadingfOrder(false));

      routes.navigate(`/order/${newOrder._id}`);
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };

export const deleteOrder =
  (id) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingfOrder(true));
      const status = await request(`/api/v1/order/${id}`, 'DELETE');
      dispatch(actions.removeOrder());
      dispatch(actions.setIsLoadingfOrder(false));
      return status;
    } catch (error) {
      dispatch(goToErrorPage(error.message));
    }
  };
