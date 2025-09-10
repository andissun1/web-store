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

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/collection',
    Component: Collection,
  },
  {
    path: '/product',
    Component: Product,
  },
  {
    path: '/shopCart',
    Component: ShopCart,
  },
  {
    path: '/auth',
    Component: Auth,
  },
  {
    path: '/favorites',
    Component: Favorites,
  },
  {
    path: '/search',
    Component: Search,
  },
  {
    path: '/newOrder',
    Component: NewOrder,
  },
  {
    path: '/AdminConsole',
    Component: AdminConsole,
  },
]);
