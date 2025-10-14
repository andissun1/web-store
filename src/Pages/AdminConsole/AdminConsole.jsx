import { useDispatch, useSelector } from 'react-redux';
import style from './AdminConsole.module.css';

export const AdminConsole = (props) => {
  const users = useSelector((store) => store.user.allUsers);
  const products = useSelector((store) => store.product.allProducts);

  return (
    <div className={style.adminConsole}>
      <div className={style.orders}>Заказы</div>
      <div className={style.users}>Пользователи</div>
      <div className={style.products}>
        Все товары
        <button className={style.addProduct}>
          <span className="icon-plus"></span>
        </button>
        <div className={style.productList}>
          {products &&
            products.map((product) => {
              console.log(product);

              return (
                <div className={style.productItem} key={product.id}>
                  <button className={style.deleteProduct}>
                    <span className="icon-trash"></span>
                  </button>
                  <img src={product.image_URL} />
                  <h4>{product.name}</h4>
                  <label htmlFor="stock">Количество на складе</label>
                  <input id="stock" type="number" value={'10'} />
                  {/* Если были изменения то показать кнопку сохранить */}
                  <button className={style.save}>Сохранить</button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
