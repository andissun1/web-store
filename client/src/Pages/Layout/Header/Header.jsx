import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../../../BFF/bff';
import { getSearchResults } from '../../../Store/appReducer';
import { useEffect } from 'react';
import { getShopCartProducts } from '../../../Store/cartReducer';
import { Button } from '../../../Components/Button/Button';
import style from './Header.module.css';

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
  const products = useSelector((store) => store.cart.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopCartProducts());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchPhrase = event.target.search.value;
    dispatch(getSearchResults(searchPhrase));
    navigate('/search');
  };

  const total = products.reduce(
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
          <input type="text" placeholder="Поиск" name="search" />
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
