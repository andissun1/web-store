import { useDispatch, useSelector } from 'react-redux';
import style from './AdminConsole.module.css';
import { Link } from 'react-router';
import { deleteProduct } from '../../Store/productReducer';

export const AdminConsole = (props) => {
  const users = useSelector((store) => store.app.allUsers);
  const products = useSelector((store) => store.app.allProducts);
  const dispatch = useDispatch();

  return (
    <div className={style.adminConsole}>
      <div className={style.orders}>Заказы</div>
      <div className={style.users}>Пользователи</div>
      <div className={style.products}>
        Все товары
        <Link to={'/product/create'} className={style.addProduct}>
          <span className="icon-plus"></span>
        </Link>
        <div className={style.productList}>
          {products &&
            products.map((product) => {
              return (
                <div className={style.productItem} key={product.id}>
                  <button
                    className={style.deleteProduct}
                    onClick={() => dispatch(deleteProduct(product.id))}
                  >
                    <span className="icon-trash" />
                  </button>
                  <Link to={`/product/${product.id}/edit`}>
                    <img src={product.image_URL} />
                  </Link>
                  <h4>{product.name}</h4>
                  <label htmlFor="stock">Количество на складе</label>
                  <input id="stock" type="number" defaultValue={product.stock_quantity} />
                  <button className={style.save}>Сохранить</button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
