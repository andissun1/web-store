import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils';

const initialState = [];

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },

    removeUsers(state, action) {
      return initialState;
    },
  },
});

export const { reducer, actions } = usersReducer;

export const getAllUsers =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      const users = await request(`http://localhost:3005/api/v1/user`);
      dispatch(actions.setAllUsers(users));
    } catch (error) {
      console.log(error.message);
    }
  };
