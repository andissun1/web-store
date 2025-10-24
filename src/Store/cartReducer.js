import { createSlice, current } from '@reduxjs/toolkit';

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
    addCartProduct(state, action) {
      state.products = [...state.products, ...action.payload];
    },
    removeFromCart(state, action) {
      console.log(123);

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

export const addToCart = (id) => async (dispatch, getState) => {
  console.log(123);
  let products = getState().cart.products;
  if (!products) return dispatch(actions.setCartProduct([{ id, count: 1 }]));
  const indexInCart = products.findIndex((product) => product.id === id);
  if (indexInCart > -1) {
    dispatch(actions.increasePosition(indexInCart));
  } else dispatch(actions.addCartProduct([{ id, count: 1 }]));
};

export const decreaseProductCount = (id) => async (dispatch, getState) => {
  let products = getState().cart.products;
  if (!products) return dispatch(actions.setCartProduct([{ id, count: 1 }]));
  const indexInCart = products.findIndex((product) => product.id === id);
  if (products[indexInCart].count === 1) return dispatch(actions.removeFromCart(id));
  if (indexInCart > -1) dispatch(actions.decreasePosition(indexInCart));
};

export const getShopCartProducts =
  () =>
  async (dispatch, getState, { server }) => {
    const allProducts = await server.getAllProducts().then((res) => res.response);
    const cart = getState().cart.products;
    const shopCart = cart.map((cartProduct) => {
      const catalog = allProducts.find((product) => product.id === cartProduct.id);
      if (!catalog) return;

      return {
        id: catalog.id,
        name: catalog.name,
        image_URL: catalog.image_URL,
        price: catalog.price,
        stock_quantity: catalog.stock_quantity,
        count: cartProduct.count,
      };
    });

    dispatch(actions.setCartProduct(shopCart));
  };
