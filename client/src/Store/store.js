import { configureStore } from '@reduxjs/toolkit';
import { routes } from '../Router/routes';
import { me, reducer as userReducer } from './userReducer';
import { reducer as productReducer } from './productReducer';
import { reducer as appReducer } from './appReducer';
import { reducer as cartReducer } from './cartReducer';
import { reducer as favoritesReducer } from './favoritesReducer';
import { reducer as modalReducer } from './modalReducer';
import { reducer as usersReducer } from './usersReducer';
import { reducer as productsReducer } from './productsReducer';
import { reducer as categoriesReducer, getCategories } from './categoriesReducer';
import { reducer as orderReducer } from './orderReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    product: productReducer,
    products: productsReducer,
    app: appReducer,
    cart: cartReducer,
    modal: modalReducer,
    favorites: favoritesReducer,
    categories: categoriesReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { routes } },
      // Отключение сериализация для вызова модалки. Есть необходимость функции хранить в контексте.
      serializableCheck: {
        ignoredActions: 'modal/setModalParams',
        ignoredActionPaths: ['modal'],
        ignoredPaths: ['modal'],
      },
    }),
});

// При обновлении приложения отправляем запрос на авторизацию
store.dispatch(me);

// Получаем все категории товаров
store.dispatch(getCategories());

// Синхронизируем локальное состояние и Redux
store.subscribe(() => {
  const favorites = JSON.stringify(store.getState().favorites.favorites);
  if (favorites) localStorage.setItem('favorites', favorites);

  const cart = JSON.stringify(store.getState().cart);
  if (cart) localStorage.setItem('cart', cart);
});
