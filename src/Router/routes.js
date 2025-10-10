import { createBrowserRouter } from 'react-router';
import { Main } from '../Pages/Main/Main';
import { Collection } from '../Pages/Collection/Collection';
import { Product } from '../Pages/Product/Product';
import { ShopCart } from '../Pages/ShopCart/ShopCart';
import { Auth } from '../Pages/Auth/Auth';
import { Favorites } from '../Pages/Favorites/Favorites';
import { Search } from '../Pages/Search/Search';
import { NewOrder } from '../Pages/NewOrder/NewOrder';
import { AdminConsole } from '../Pages/AdminConsole/AdminConsole';
import { ErorPage } from '../Pages/ErorPage/ErorPage';
import { Layout } from '../Pages/Layout/Layout';

const authPage = () =>
  ['auth', 'register', 'resetPassword'].map((path) => ({
    path,
    Component: Auth,
  }));

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Main,
      },
      ...authPage(),
      {
        path: 'collection',
        Component: Collection,
      },
      {
        path: 'product',
        Component: Product,
      },
      {
        path: 'shopCart',
        Component: ShopCart,
      },
      {
        path: 'favorites',
        Component: Favorites,
      },
      {
        path: 'search',
        Component: Search,
      },
      {
        path: 'newOrder',
        Component: NewOrder,
      },
      {
        path: 'AdminConsole',
        Component: AdminConsole,
      },
      {
        path: '*',
        Component: ErorPage,
      },
    ],
  },
]);
