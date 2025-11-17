import { useDispatch, useSelector } from 'react-redux';
import style from './AdminConsole.module.css';
import { Link } from 'react-router';
import { deleteProduct } from '../../Store/productReducer';
import { useEffect } from 'react';
import { actions as usersActions, getAllUsers } from '../../Store/usersReducer';
import { actions as productsActions, getAllProducts } from '../../Store/productsReducer';
import { Loader } from '../../Components/Loader/Loader';
import { FormInput } from '../../Components/FormInput/FormInput';
import { Button } from '../../Components/Button/Button';
import { getConfirmation } from '../../Store/modalReducer';

export const AdminConsole = () => {
  const users = useSelector((store) => store.users);
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllProducts());

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

    if (confirm) dispatch(deleteProduct(id));
  };

  if (!users || !products) return <Loader />;

  return (
    <div className={style.adminConsole}>
      <div className={style.orders}>
        <h2>Заказы</h2>
      </div>
      <div className={style.users}>
        <h2>Пользователи</h2>
        {users.map((user) => (
          <div key={user.email}>{user.fullname}</div>
        ))}
      </div>
      <div className={style.products}>
        <h2>Товары</h2>
        <Link to={'/product/create'} className={style.addProduct}>
          <span className="icon-plus" />
        </Link>
        <div className={style.productList}>
          {products.map((product) => {
            return (
              <div className={style.productItem} key={product.id}>
                <Button
                  icon="icon-trash"
                  id="deleteButton"
                  onClick={() => handleDelete(product.id)}
                />
                <Link to={`/product/${product.id}/edit`}>
                  <img src={product.image_URL} />
                </Link>
                <h4>{product.name}</h4>
                <FormInput
                  label="Количество на складе"
                  id="stock"
                  type="number"
                  value={product.stock_quantity}
                  onChange={() => {}}
                />
                <button className={style.save}>Сохранить</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
