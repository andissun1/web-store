import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: null,
  allProducts: null,
  allUsers: null,
  favorites: null,
  favoritesCards: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError(state, action) {
      return { errors: action.payload };
    },
    setAllProducts(state, action) {
      state.allProducts = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setFavoritesCards(state, action) {
      state.favoritesCards = action.payload;
    },
  },
});

export const { reducer, actions } = appSlice;

export const getAllProducts =
  () =>
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllProducts(hash);
    if (error) return error;
    dispatch(actions.setAllProducts(response));
  };

export const getAllUsers =
  () =>
  async (dispatch, getState, { server }) => {
    const hash = getState().user.hash;
    const { response, error } = await server.getAllUsers(hash);
    if (error) return error;
    dispatch(actions.setAllUsers(response));
  };

export const addToFavorites =
  (id) =>
  async (dispatch, getState, { server }) => {
    const favorites = [...getState().app.favorites];
    if (favorites.includes(id)) return console.log('Товар уже имеется в избранном');
    favorites.push(id);
    dispatch(actions.setFavorites(favorites));
  };

export const removeFromFavorites =
  (id) =>
  async (dispatch, getState, { server }) => {
    const favorites = getState().app.favorites;
    const newFavorites = favorites.filter((item) => item !== id);
    dispatch(actions.setFavorites(newFavorites));
  };

export const getFavorites =
  (id) =>
  async (dispatch, getState, { server }) => {
    const favorites = getState().app.favorites;
    if (!favorites) return;
    const allProducts = getState().app.allProducts;
    const favoriteProducts = allProducts.filter((product) =>
      favorites.includes(product.id)
    );
    dispatch(actions.setFavoritesCards(favoriteProducts));
  };
