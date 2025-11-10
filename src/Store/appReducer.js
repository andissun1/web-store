import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: null,
  allProducts: [],
  allUsers: [],
  favorites: [],
  favoritesCards: null,
  search: { searchPhrase: null, result: null, error: null },
  categories: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError(state, action) {
      state.errors = action.payload;
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
    setSearchPhrase(state, action) {
      state.search.searchPhrase = action.payload;
    },
    setResult(state, action) {
      state.search.result = action.payload;
    },
    setSearchError(state, action) {
      state.search.error = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
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

export const getSearchResults =
  (value) =>
  async (dispatch, getState, { server }) => {
    const response = await server.findPhrase(value);
    if (response.error) return dispatch(actions.setSearchError(response.error));
    dispatch(actions.setSearchError(null));
    dispatch(actions.setResult(response.response));
  };

export const getCategories =
  () =>
  async (dispatch, getState, { server }) => {
    const response = await server.getCategories();
    if (response.error) return dispatch(actions.setError(response.error));
    dispatch(actions.setError(null));
    dispatch(actions.setCategories(response.response));
  };

export const getCategory =
  (id) =>
  async (dispatch, getState, { server }) => {
    const response = await server.getCategory(id);
    if (response.error) return dispatch(actions.setError(response.error));
    dispatch(actions.setError(null));
    dispatch(actions.setAllProducts(response.response));
  };

export const sortCollection =
  (id, sortType) =>
  async (dispatch, getState, { server }) => {
    const response = await server.sortCollection(id, sortType);
    if (response.error) return dispatch(actions.setError(response.error));
    dispatch(actions.setError(null));
    dispatch(actions.setAllProducts(response.response));
  };
