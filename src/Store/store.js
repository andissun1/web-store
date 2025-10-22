import { configureStore } from '@reduxjs/toolkit';
import { authorizeByHash, reducer as userReducer } from './userReducer';
import { reducer as productReducer } from './productReducer';
import { reducer as appReducer, getAllProducts } from './appReducer';
import { server } from '../BFF/bff';
import { routes } from '../Router/routes';
import { actions as cartActions } from './cartReducer';
import { actions as appActions } from './appReducer';

export const store = configureStore({
  reducer: { user: userReducer, product: productReducer, app: appReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { server, routes } },
    }),
});

store.dispatch(getAllProducts());

if (sessionStorage.getItem('hash') && store.user === undefined) {
  const hash = JSON.parse(sessionStorage.getItem('hash'));
  store.dispatch(authorizeByHash(hash));
}

if (localStorage.getItem('favorites')) {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  store.dispatch(appActions.setFavorites(favorites));
}

if (localStorage.getItem('cart')) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  store.dispatch(cartActions.setCart(cart));
}

store.subscribe(() => {
  const favorites = JSON.stringify(store.getState().app.favorites);
  const cart = JSON.stringify(store.getState().cart);
  localStorage.setItem('favorites', favorites || null);
  localStorage.setItem('cart', cart || null);
});
