import { createSlice } from '@reduxjs/toolkit';

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
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllUsers(hash);
    if (error) return console.log(error);
    dispatch(actions.setAllUsers(response));
  };
