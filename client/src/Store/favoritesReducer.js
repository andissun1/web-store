import { createSlice } from '@reduxjs/toolkit';
import { request } from '../utils';
import { actions as appActions } from './appReducer';

const initialState = {
  favorites: localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [],
  favoritesCards: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setFavoritesCards(state, action) {
      state.favoritesCards = action.payload;
    },
  },
});

export const { reducer, actions } = favoritesSlice;

export const getFavorites =
  () =>
  async (dispatch, getState, { routes }) => {
    try {
      const favoritesIDs = getState().favorites.favorites;
      if (favoritesIDs.length === 0) return;

      const favoritesCards = await Promise.all(
        favoritesIDs.map((id) => request(`http://localhost:3005/api/v1/product/${id}`))
      );

      dispatch(actions.setFavoritesCards(favoritesCards));
    } catch (error) {
      dispatch(appActions.setError(error.message));
      routes.navigate('/error');
    }
  };

export const addToFavorites = (id) => async (dispatch, getState) => {
  const favorites = [...getState().favorites.favorites];
  if (favorites.includes(id)) return console.log('Товар уже имеется в избранном');
  favorites.push(id);
  dispatch(actions.setFavorites(favorites));
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
  const favorites = getState().favorites.favorites;
  const newFavorites = favorites.filter((item) => item !== id);
  dispatch(actions.setFavorites(newFavorites));
};
