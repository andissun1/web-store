import { HorizontalCard } from '../../Components/HorizontalCard/HorizontalCard';
import style from './ShopCart.module.css';

export const ShopCart = (props) => {
  return (
    <>
      <h2>Корзина</h2>
      <div className={style.shopCart}>
        <div className={style.cardList}>
          <HorizontalCard />
          <HorizontalCard />
          <HorizontalCard />
          <HorizontalCard />
          <HorizontalCard />
          <HorizontalCard />
        </div>
        <div className={style.info}>
          <h2 className={style.info__title}>В корзине</h2>
          <span>Товаров: 12</span>
          <span className={style.promocode}>Введите промокод</span>
          <span className={style.price}>42 330 ₽</span>
          <div className={style.actions}>
            <button className={style.buy}>Оформить заказ</button>
            <button className={style.share}>Поделиться</button>
          </div>
        </div>
      </div>
    </>
  );
};
