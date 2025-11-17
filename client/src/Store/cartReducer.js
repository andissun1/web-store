import { createSlice, current } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || {
  products: [],
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
    addCartProduct(state, action) {
      state.products = [...state.products, ...action.payload];
    },
    removeFromCart(state, action) {
      const index = current(state).products.findIndex(
        (product) => product.id === action.payload
      );
      state.products.splice(index, 1);
    },
    increasePosition(state, action) {
      state.products[action.payload].count++;
    },
    decreasePosition(state, action) {
      state.products[action.payload].count--;
    },
  },
});

export const { reducer, actions } = cartSlice;

export const addToCart = (product) => async (dispatch, getState) => {
  let shopCart = getState().cart.products;
  const indexInCart = shopCart.findIndex((position) => position.id === product.id);
  if (indexInCart > -1) {
    dispatch(actions.increasePosition(indexInCart));
  } else dispatch(actions.addCartProduct([{ ...product, count: 1 }]));
};

export const decreaseProductCount = (id) => async (dispatch, getState) => {
  let products = getState().cart.products;
  const indexInCart = products.findIndex((position) => position.id === id);
  if (products[indexInCart].count === 1) return dispatch(actions.removeFromCart(id));
  if (indexInCart > -1) dispatch(actions.decreasePosition(indexInCart));
};

// Функция для очистки {} с продуктами от ненужных полей
export const getShopCartProducts = () => async (dispatch, getState) => {
  const productsInCart = getState().cart.products;
  const shopCart = productsInCart.map((product) => {
    return {
      id: product.id,
      name: product.name,
      image_URL: product.image_URL,
      price: product.price,
      stock_quantity: product.stock_quantity,
      count: product.count,
    };
  });
  dispatch(actions.setCartProduct(shopCart));
};
