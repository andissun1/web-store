import { Link, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getSearchResults } from '../../../Store/appReducer';
import { useEffect } from 'react';
import { getShopCartProducts } from '../../../Store/cartReducer';
import { Button } from '../../../Components/Button/Button';
import style from './Header.module.css';
import { useRef } from 'react';

const LIMIT_PRODUCTS_ON_PAGE = 12;

const pages = [
  {
    link: '/payment',
    title: 'Оплата',
  },
  {
    link: '/delivery',
    title: 'Доставка',
  },
  {
    link: '/refund',
    title: 'Обмен и возврат',
  },
];

export const Header = () => {
  const isAdmin = useSelector((store) => store.user.roleName) === 'admin';
  const shopCart = useSelector((store) => store.cart.products);
  const searchInput = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopCartProducts());
  }, []);

  useEffect(() => {
    if (location.pathname !== '/search') {
      dispatch(actions.setSearchPhrase(''));
      searchInput.current.value = '';
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSearchResults(event.target.search.value, LIMIT_PRODUCTS_ON_PAGE, 1));
    dispatch(actions.setSearchPhrase(event.target.search.value));
    navigate('/search');
  };

  const total = shopCart.reduce(
    (acc, product) => (acc += product.price * product.count),
    0
  );

  return (
    <header>
      <div className={style.purpleLine}>
        <nav className={style.headerContent}>
          <ul>
            {pages.map((page) => (
              <li key={page.link}>{page.title}</li>
            ))}
          </ul>
          <p>Доставка с 8:00 до 23:00</p>
          <a href="tel:+78008008080">+7 (800) 800-80-80</a>
        </nav>
      </div>

      <div className={style.secondLine}>
        <Link to={'/'} className={style.logo}>
          <img src="https://static.insales-cdn.com/files/1/7649/24960481/original/Frame.png" />
        </Link>
        <Button icon="icon-bars _show">Каталог</Button>

        <form onSubmit={handleSubmit} className={style.search}>
          <input type="text" placeholder="Поиск" name="search" ref={searchInput} />
          <Button icon="icon-search" type="submit" />
        </form>

        <nav className={style.controlPannel}>
          <Link to={'/auth/login'} className="icon-user" />
          {isAdmin && <Link to={'/adminConsole'} className="icon-tasks" />}
          <Link to={'/favorites'} className="icon-favorites" />
          <Link to={'/shopCart'} className="icon-cart">
            <span>{total} ₽</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
