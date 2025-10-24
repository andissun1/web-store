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
import { getProduct } from '../Store/productReducer';
import { getAllProducts, getFavorites } from '../Store/appReducer';
import { getAllUsers } from '../Store/appReducer';
import { EditProduct } from '../Pages/EditProduct/EditProduct';
// Динамический импорт чтобы избежать циклической зависимости со Store
const store = import('../Store/store').then(({ store }) => store);

const authPage = () =>
  ['auth', 'register', 'resetPassword'].map((path) => ({
    path,
    Component: Auth,
  }));

// Можно будет нарисовать и вынести в компоненты
const Loader = () => <h2>Загрузка...</h2>;

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
        path: 'collection/:id',
        Component: Collection,
        loader: async ({ params }) =>
          store.then(({ dispatch }) => dispatch(getAllProducts())),
        hydrateFallbackElement: <Loader />,
      },

      {
        path: 'product/:id',
        Component: Product,
        loader: async ({ params }) =>
          store.then(({ dispatch }) => dispatch(getProduct(params.id))),
        hydrateFallbackElement: <Loader />,
      },
      {
        path: 'product/:id/edit',
        Component: EditProduct,
        loader: async ({ params }) =>
          store.then(({ dispatch }) => dispatch(getProduct(params.id))),
        hydrateFallbackElement: <Loader />,
      },
      { path: 'product/create', Component: EditProduct },
      {
        path: 'shopCart',
        Component: ShopCart,
      },
      {
        path: 'favorites',
        Component: Favorites,
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
        loader: async () =>
          store.then(({ dispatch }) => {
            dispatch(getAllUsers());
            dispatch(getAllProducts());
          }),
        hydrateFallbackElement: <Loader />,
      },
      {
        path: '*',
        Component: ErorPage,
      },
    ],
  },
]);
