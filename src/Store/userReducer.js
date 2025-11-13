import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';

const initialState = {
  id: null,
  fullname: null,
  email: null,
  phone: null,
  created_at: null,
  role_id: null,
  addresses: null,
  hash: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      sessionStorage.setItem('hash', JSON.stringify(action.payload.hash));
      return action.payload;
    },
    removeUser() {
      sessionStorage.clear();
      return initialState;
    },
  },
});

export const { reducer, actions } = userSlice;

// Асинхронные операции
export const authorize = (email, password) => async (dispatch, getState, extraArg) => {
  const { server, routes } = extraArg;
  const { response, error } = await server.authorize(email, password);
  if (error) {
    dispatch(appActions.setError(error));
    routes.navigate('/error');
  } else {
    dispatch(actions.setUser(response));
    routes.navigate('/');
  }
};

export const authorizeByHash =
  (hash) =>
  async (dispatch, getState, { server }) => {
    const { response, error } = await server.authorizeByHash(hash);
    if (error) {
      dispatch(appActions.setError(error));
      routes.navigate('/error');
    } else dispatch(actions.setUser(response));
  };

export const logout =
  () =>
  async (dispatch, getState, { server }) => {
    const { error } = await server.logout(getState().user.hash);
    if (error) {
      dispatch(appActions.setError(error));
      routes.navigate('/error');
    } else dispatch(actions.removeUser());
  };

export const register = (formData) => async (dispatch, getState, extraArg) => {
  const { server, routes } = extraArg;
  const { response, error } = await server.register(formData);
  if (error) {
    dispatch(appActions.setError(error));
    routes.navigate('/error');
  } else {
    dispatch(actions.setUser(response));
    routes.navigate('/');
  }
};

export const resetPassword =
  (email) =>
  (_, __, { server }) =>
    server.resetPassword(email);
