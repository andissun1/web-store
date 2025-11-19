import { createSlice } from '@reduxjs/toolkit';
import { actions as appActions } from './appReducer';
import { request } from '../utils';

const initialState = {
  id: null,
  fullname: null,
  email: null,
  phone: null,
  created_at: null,
  role_id: null,
  addresses: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return initialState;
    },
  },
});

export const { reducer, actions } = userSlice;

// Асинхронные операции
export const authorize =
  (email, password) =>
  async (dispatch, getState, { routes }) => {
    try {
      const { userData } = await request(
        `http://localhost:3005/api/v1/auth/login`,
        'POST',
        {
          email,
          password,
        }
      );
      dispatch(actions.setUser(userData));
      routes.navigate('/');
    } catch (error) {
      return error.message;
    }
  };

export const logout =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      await request(`http://localhost:3005/api/v1/auth/logout`, 'POST');
      dispatch(actions.removeUser());
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const register =
  (formData) =>
  async (dispatch, getState, { routes }) => {
    try {
      const newUser = await request(
        `http://localhost:3005/api/v1/auth/register`,
        'POST',
        formData
      );
      dispatch(actions.setUser(newUser));
      routes.navigate('/');
    } catch (error) {
      return error.message;
    }
  };

export const resetPassword = (email) => () => {
  try {
    const newPassword = request(
      `http://localhost:3005/api/v1/auth/resetPassword`,
      'POST',
      { email }
    );
    return newPassword;
  } catch (error) {
    return error.message;
  }
};

// При обновлении приложения отправляем запрос на авторизацию
export const me = async (dispatch) => {
  try {
    const { user } = await request(`http://localhost:3005/api/v1/auth/me`);
    dispatch(actions.setUser(user));
  } catch (error) {
    console.log(error.message);
  }
};
