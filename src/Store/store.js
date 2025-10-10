import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './userReducer';
import { server } from '../BFF/bff';
import { routes } from '../Router/routes';

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: { server, routes } } }),
});
