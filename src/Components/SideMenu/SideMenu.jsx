import { NavLink } from 'react-router';
import style from './SideMenu.module.css';

// NavLink будет динамически создаваться по наличию категорий в массиве

const categories = [
  'Для девочек',
  'Для мальчиков',
  'Для новорожденных',
  'Канцелярия',
  'Аксессуары',
  'Спорт',
  'Настольные игры',
  'Коляски',
  'Развитие',
  'Конструкторы',
  'Хиты',
  'Новинки',
  'Акции',
  'Популярное',
];

export const SideMenu = (props) => {
  return (
    <div className={style.SideMenu}>
      <nav>
        {categories.map((category) => (
          <NavLink to={category} children={category} className={style.navLink} />
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
          <div className={style.product}>
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
