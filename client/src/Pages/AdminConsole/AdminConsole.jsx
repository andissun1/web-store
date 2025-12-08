import { useDispatch, useSelector } from 'react-redux';
import style from './AdminConsole.module.css';
import { deleteProduct } from '../../Store/productReducer';
import { useEffect, useState } from 'react';
import { actions as usersActions, getAllUsers } from '../../Store/usersReducer';
import { actions as productsActions, getAllProducts } from '../../Store/productsReducer';
import { Loader } from '../../Components/Loader/Loader';
import { getConfirmation } from '../../Store/modalReducer';
import { getAllOrders } from '../../Store/orderReducer';
import { AdminOrderTable } from '../../Components/AdminOrderTable/AdminOrderTable';
import { UserContolCenter } from '../../Components/UserContolCenter/UserContolCenter';
import { AdminProductsPannel } from '../../Components/AdminProductsPannel/AdminProductsPannel';

export const AdminConsole = () => {
  const { users } = useSelector((store) => store.users);
  const isLoadingUsers = useSelector((store) => store.users.isLoadingUsers);
  const { products } = useSelector((store) => store.products);
  const isLoadingProducts = useSelector((store) => store.products.isLoadingProducts);
  const orders = useSelector((store) => store.order.orders);
  const isLoadingOrders = useSelector((store) => store.order.isLoadingOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllProducts());
    dispatch(getAllOrders());

    return () => {
      dispatch(usersActions.removeUsers());
      dispatch(productsActions.removeProducts());
    };
  }, []);

  const handleDelete = async (id) => {
    const confirm = await dispatch(
      getConfirmation({
        title: 'Вы уверены что хотите удалить товар?',
      })
    );

    if (confirm) {
      dispatch(deleteProduct(id));
      const newProductsList = productsActions.setAllProducts(
        products.filter((products) => products._id !== id)
      );
      dispatch(newProductsList);
    }
  };

  if (isLoadingUsers || isLoadingProducts || isLoadingOrders) return <Loader />;

  return (
    <div className={style.adminConsole}>
      <div className={style.orders}>
        <h2>Заказы</h2>
        <AdminOrderTable orders={orders} />
      </div>
      <div className={style.users}>
        <h2>Пользователи</h2>
        <UserContolCenter users={users} />
      </div>
      <div className={style.products}>
        <h2>Товары</h2>
        <AdminProductsPannel products={products} handleDelete={handleDelete} />
      </div>
    </div>
  );
};
