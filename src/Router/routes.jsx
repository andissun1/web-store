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
import { getFavorites } from '../Store/favoritesReducer';
import { EditProduct } from '../Pages/EditProduct/EditProduct';
import { Loader } from '../Components/Loader/Loader';
// Динамический импорт чтобы избежать циклической зависимости со Store
const store = import('../Store/store').then(({ store }) => store);

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Main,
      },
      {
        path: '/auth/:type',
        Component: Auth,
      },
      {
        path: 'collection/:id',
        Component: Collection,
      },

      {
        path: 'product/:id',
        Component: Product,
      },
      {
        path: 'product/:id/edit',
        Component: EditProduct,
      },
      { path: 'product/create', Component: EditProduct },
      {
        path: 'shopCart',
        Component: ShopCart,
      },
      {
        path: 'favorites',
        Component: Favorites,
        // Небольшой пример работы с router для доп.практики
        loader: async () => store.then(({ dispatch }) => dispatch(getFavorites())),
        hydrateFallbackElement: <Loader />,
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
        path: 'adminConsole',
        Component: AdminConsole,
      },
      {
        path: '*',
        Component: ErorPage,
      },
    ],
  },
]);
