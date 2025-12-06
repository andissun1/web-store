import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils';

const initialState = {
  isLoadingUsers: true,
  users: [],
};

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.users = action.payload;
    },

    removeUsers(state, action) {
      return initialState;
    },
    setIsLoadingUsers(state, action) {
      state.isLoadingUsers = action.payload;
    },
  },
});

export const { reducer, actions } = usersReducer;

export const getAllUsers =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      dispatch(actions.setIsLoadingUsers(true));
      const users = await request(`/api/v1/user`);
      dispatch(actions.setAllUsers(users));
      dispatch(actions.setIsLoadingUsers(false));
    } catch (error) {
      console.log(error.message);
    }
  };
