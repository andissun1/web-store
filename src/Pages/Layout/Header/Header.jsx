import { Link, useNavigate } from 'react-router';
import style from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../../../BFF/bff';
import { getSearchResults } from '../../../Store/appReducer';
import { useEffect, useMemo } from 'react';
import { getShopCartProducts } from '../../../Store/cartReducer';

export const Header = (props) => {
  const isAdmin = useSelector((store) => store.user.role_id) === ROLES.admin;
  const products = useSelector((store) => store.cart.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopCartProducts());
  }, [products]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSearchResults(event.target.search.value));
    navigate('/search');
  };

  const total = useMemo(
    () => products.reduce((acc, product) => (acc += product.price * product.count), 0),
    [products, products.length]
  );

  return (
    <header>
      <nav className={style.firstLine}>
        <div className={style.headerContent}>
          <ul>
            <li>
              <a>Оплата</a>
            </li>
            <li>
              <a>Доставка</a>
            </li>
            <li>
              <a>Обмен и возврат</a>
            </li>
          </ul>
          <div>Доставка с 8:00 до 23:00</div>
          <a href="tel:+78008008080">+7 (800) 800-80-80</a>
        </div>
      </nav>

      <nav className={style.secondLine}>
        <Link to={'/'}>
          <img
            src="https://static.insales-cdn.com/files/1/7649/24960481/original/Frame.png"
            alt="logo"
          />
        </Link>
        <button>
          <span className="icon-bars _show"></span>
          Каталог
        </button>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Поиск" name="search" />
          <button type="submit">
            <span className="icon-search"></span>
          </button>
        </form>
        <div className={style.controlPannel}>
          <Link to={'/auth'} className="icon-user" href="" />
          {isAdmin && <Link to={'/adminConsole'} className="icon-tasks" />}
          <Link to={'/favorites'} className="icon-favorites" />
          <Link to={'/shopCart'} className="icon-cart">
            <span>{total} ₽</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
