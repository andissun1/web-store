import { Link } from 'react-router';
import style from './promoWidget.module.css';

export const PromoWidget = (props) => {
  return (
    <div className={style.promoWidget}>
      <Link to={'/collection/1'}>
        <img src="https://static.insales-cdn.com/r/S98eZiPUAfo/rs:fit:1438:0:1/q:100/plain/files/1/7499/24771915/original/banner_desktop__1__7b8f548f892c6c10008195e457122f79.jpg@webp" />
      </Link>
      <div className={style.promoWidget__footer}>
        <div className={style.footer__text}>
          <h1>Скидки на детскую мебель</h1>
          <span>
            Сезонные скидки, распродажи, ликвидация остатков! Все товары с сезонными
            скидками.
          </span>
        </div>
        <Link to={'/product'}>
          <button>Все товары</button>
        </Link>
      </div>
    </div>
  );
};
