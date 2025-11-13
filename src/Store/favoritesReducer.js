import { createSlice } from '@reduxjs/toolkit';

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
  (id) =>
  async (dispatch, getState, { server }) => {
    const favorites = getState().favorites.favorites;
    if (!favorites) return;
    const favoritesCards = await server.getFavorites(getState().favorites.favorites);
    dispatch(actions.setFavoritesCards(favoritesCards.response));
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
