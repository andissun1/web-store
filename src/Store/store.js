import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './userReducer';
import { reducer as productReducer } from './productReducer';
import { reducer as appReducer } from './appReducer';
import { server } from '../BFF/bff';
import { routes } from '../Router/routes';

export const store = configureStore({
  reducer: { user: userReducer, product: productReducer, app: appReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: { server, routes } } }),
});
