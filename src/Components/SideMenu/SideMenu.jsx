import { NavLink } from 'react-router';
import style from './SideMenu.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Store/appReducer';

export const SideMenu = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.app.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (!categories) return <h2></h2>;

  return (
    <div className={style.SideMenu}>
      <nav>
        {categories.map((category) => (
          <NavLink
            to={`/collection/${category.id}`}
            children={category.name}
            className={style.navLink}
            key={category.id}
          />
        ))}
      </nav>

      <div className={style.social}>
        <h3>Подписывайтесь</h3>
        <div className={style.icons}>
          <a target="_blank" href="#" className="social-img-item">
            <img
              src="https://static.insales-cdn.com/files/1/302/24346926/original/svg18.svg"
              alt="Иконка социальной сети"
            />
          </a>
          <a target="_blank" href="#" className="social-img-item">
            <img
              src="https://static.insales-cdn.com/files/1/1816/24987416/original/svg19.svg"
              alt="Иконка социальной сети"
            />
          </a>
          <a target="_blank" href="#" className="social-img-item">
            <img
              src="https://static.insales-cdn.com/files/1/304/24346928/original/svg16.svg"
              alt="Иконка социальной сети"
            />
          </a>
        </div>
      </div>

      <div className={style.widget_popular}>
        <h3>Популярное</h3>
        {['Тор', 'Медвежонок', 'Динозавр'].map((product) => (
          <div className={style.product} key={product}>
            <img
              src="https://imgholder.ru/100x100/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson"
              alt={product}
            />
            <p>{product}</p>
            <p>
              <strong> 1000р </strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
