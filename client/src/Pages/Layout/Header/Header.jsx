import { Link, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getSearchResults } from '../../../Store/searchReducer';
import { useEffect, useState } from 'react';
import { getShopCartProducts } from '../../../Store/cartReducer';
import { Button } from '../../../Components/Button/Button';
import { LIMIT } from '../../../Components/Pagination/Pagination';
import style from './Header.module.css';
import { useRef } from 'react';
import { getConfirmation } from '../../../Store/modalReducer';
import { MobileHeader } from './MobileHeader/MobileHeader';

const pages = [
  {
    link: '/page/payment',
    title: 'Оплата',
  },
  {
    link: '/page/delivery',
    title: 'Доставка',
  },
  {
    link: '/page/refund',
    title: 'Обмен и возврат',
  },
];

export const Header = () => {
  const isAdmin = useSelector((store) => store.user?.roleName) === 'admin';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const shopCart = useSelector((store) => store.cart.products);
  const searchInput = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopCartProducts());
    const handleResize = () => setIsMobile(window.innerWidth < 770);
    window.addEventListener('resize', handleResize);

    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/search') {
      dispatch(actions.setSearchPhrase(''));
      if (!isMobile) searchInput.current.value = '';
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target.search;
    dispatch(getSearchResults(value, LIMIT, 1));
    navigate('/search');
  };

  const showCategories = () => {
    dispatch(getConfirmation({ type: 'getCategory' }));
  };

  const total = shopCart.reduce(
    (acc, product) => (acc += product.price * product.count),
    0
  );

  if (isMobile) return <MobileHeader isAdmin={isAdmin} />;

  return (
    <header>
      <div className={style.purpleLine}>
        <nav className={style.headerContent}>
          <ul>
            {pages.map((page) => (
              <li key={page.link}>
                <Link to={page.link}>{page.title}</Link>
              </li>
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
        <Button icon="icon-bars _show" onClick={showCategories}>
          Каталог
        </Button>

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
