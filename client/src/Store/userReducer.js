import { createSlice } from '@reduxjs/toolkit';
import { goToErrorPage } from './appReducer';
import { request } from '../utils';

const initialState = {
  isLoadingUser: true,
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
    setIsLoadingUser(state, action) {
      state.isLoadingUser = action.payload;
    },
  },
});

export const { reducer, actions } = userSlice;

// Асинхронные операции
export const authorize =
  (email, password) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingUser(true));
      const { userData } = await request(`/api/v1/auth/login`, 'POST', {
        email,
        password,
      });
      dispatch(actions.setUser(userData));
      dispatch(actions.setIsLoadingUser(false));

      routes.navigate('/');
    } catch (error) {
      return error.message;
    }
  };

export const logout = () => async (dispatch) => {
  try {
    dispatch(actions.setIsLoadingUser(true));

    await request(`/api/v1/auth/logout`, 'POST');
    dispatch(actions.removeUser());
    dispatch(actions.setIsLoadingUser(false));
  } catch (error) {
    dispatch(goToErrorPage(error.message));
  }
};

export const register =
  (formData) =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingUser(true));

      const newUser = await request(`/api/v1/auth/register`, 'POST', formData);
      dispatch(actions.setUser(newUser));
      dispatch(actions.setIsLoadingUser(false));

      routes.navigate('/');
    } catch (error) {
      return error.message;
    }
  };

export const resetPassword = (email) => (dispatch) => {
  try {
    dispatch(actions.setIsLoadingUser(true));
    const newPassword = request(`/api/v1/auth/resetPassword`, 'POST', { email });
    dispatch(actions.setIsLoadingUser(false));
    return newPassword;
  } catch (error) {
    return error.message;
  }
};

// При обновлении приложения отправляем запрос на авторизацию
export const me = async (dispatch) => {
  try {
    dispatch(actions.setIsLoadingUser(true));
    const { user } = await request(`/api/v1/auth/me`);
    dispatch(actions.setUser(user));
    dispatch(actions.setIsLoadingUser(false));
  } catch (error) {
    dispatch(actions.setIsLoadingUser(false));
    // Приходит регулярно сообщение о статусе авторизации
    // console.log(error.message);
  }
};
