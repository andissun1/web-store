import { createSlice } from '@reduxjs/toolkit';

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
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
  },
});

export const { reducer, actions } = userSlice;

// Асинхронные операции
export const authorize = (email, password) => async (dispatch, getState, extraArg) => {
  const { server, routes } = extraArg;
  const { response, error } = await server.authorize(email, password);
  if (error) return error;
  dispatch(actions.setUser(response));
  routes.navigate('/');
};

export const authorizeByHash =
  (hash) =>
  async (dispatch, getState, { server }) => {
    const { response, error } = await server.authorizeByHash(hash);
    if (error) console.log(error);
    dispatch(actions.setUser(response));
  };

export const logout =
  () =>
  async (dispatch, getState, { server }) => {
    const { error } = await server.logout(getState().user.hash);
    if (error) return error;
    dispatch(actions.removeUser());
  };

export const register = (formData) => async (dispatch, getState, extraArg) => {
  const { server, routes } = extraArg;
  const { response, error } = await server.register(formData);
  if (error) return error;
  dispatch(actions.setUser(response));
  routes.navigate('/');
};

export const resetPassword =
  (formData) =>
  (dispatch, getState, { server }) =>
    server.resetPassword(formData);

export const getAllUsers =
  () =>
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllUsers(hash);
    if (error) return error;
    dispatch(actions.setAllUsers(response));
  };
