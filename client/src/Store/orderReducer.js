import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';
import { request } from '../utils';

const initialState = null;

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo(state, action) {
      return action.payload;
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
      const order = await request(`http://localhost:3005/api/v1/order/${id}`);
      dispatch(actions.setOrderInfo(order));
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const getAllOrders =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      const orders = await request(`http://localhost:3005/api/v1/order`);
      return orders;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const createOrder =
  (orderInfo) =>
  async (dispatch, getState, { routes }) => {
    try {
      const newOrder = await request(
        `http://localhost:3005/api/v1/order`,
        'POST',
        orderInfo
      );
      dispatch(actions.setOrderInfo(newOrder));
      routes.navigate(`/order/${newOrder._id}`);
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const deleteOrder =
  (id) =>
  async (dispatch, getState, { routes }) => {
    try {
      const status = await request(`http://localhost:3005/api/v1/order/${id}`, 'DELETE');
      dispatch(actions.removeOrder());
      return status;
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };
