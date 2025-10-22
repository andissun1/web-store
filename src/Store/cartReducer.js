import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: null,
  promocode: null,
  total: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    setCartProduct(state, action) {
      state.products = action.payload;
    },
  },
});

export const { reducer, actions } = cartSlice;

export const addToCart =
  (id) =>
  async (dispatch, getState, { server }) => {
    const products = getState().cart.products;
    const indexInCart = products.findIndex((product) => product.id === id);
    if (indexInCart >= 0) {
      products[indexInCart].count++;
    } else {
      const thisProduct = getState().app.allProducts.find((product) => product.id === id);
      products.push(thisProduct);
    }

    dispatch(actions.setCartProduct(products));
  };

export const removeFromCart =
  (id) =>
  async (dispatch, getState, { server }) => {
    const products = getState().cart.products;
    const indexInCart = products.findIndex((product) => product.id === id);
    if (indexInCart >= 0) {
      products = products.filter((product) => product.id !== id);
    } else {
      console.log('Ошибка, товара нет в корзине.');
    }

    dispatch(actions.setCartProduct(products));
  };

export const decreaseProductCount =
  (id) =>
  async (dispatch, getState, { server }) => {
    const products = getState().cart.products;
    const indexInCart = products.findIndex((product) => product.id === id);
    if (indexInCart >= 0) {
      if (products[indexInCart].count === 1) return removeFromCart(id);
      products[indexInCart].count--;
    } else {
      console.log('Ошибка. Товара нет в корзине.');
    }

    dispatch(actions.setCartProduct(products));
  };
