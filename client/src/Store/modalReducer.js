import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalParams(state, action) {
      return action.payload;
    },
    closeModal() {
      return initialState;
    },
  },
});

export const { reducer, actions } = modalReducer;

// Функция для получения подтвержения действия пользователя или ввода данных
export const getConfirmation = (params) => async (dispatch) => {
  return new Promise((resolve) => {
    dispatch(
      actions.setModalParams({
        ...params,
        onClose: (response) => {
          dispatch(actions.closeModal());
          resolve(response || false);
        },
        onConfirm: (response) => {
          dispatch(actions.closeModal());
          resolve(response || true);
        },
      })
    );
  });
};
