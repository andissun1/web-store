import { useDispatch, useSelector } from 'react-redux';
import { HorizontalCard } from '../../Components/HorizontalCard/HorizontalCard';
import style from './ShopCart.module.css';
import { useEffect, useMemo } from 'react';
import { getShopCartProducts } from '../../Store/cartReducer';
import { getConfirmation } from '../../Store/modalReducer';

export const ShopCart = (props) => {
  const products = useSelector((store) => store.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopCartProducts());
  }, []);

  const totalCount = useMemo(
    () => products.reduce((acc, product) => (acc += product.count), 0),
    [products]
  );

  const total = useMemo(
    () => products.reduce((acc, product) => (acc += product.price * product.count), 0),
    [products]
  );

  const openModal = () => {
    dispatch(getConfirmation({ type: 'OneClickOrder' }));
  };

  return (
    <>
      <h2>Корзина</h2>
      <div className={style.shopCart}>
        <div className={style.cardList}>
          {products.map((product) => (
            <HorizontalCard product={product} key={product._id} />
          ))}
        </div>
        <div className={style.info}>
          <h2 className={style.info__title}>В корзине</h2>
          <span>Товаров: {totalCount}</span>
          <span className={style.promocode}>Введите промокод</span>
          <span className={style.price}>{total} ₽</span>
          <div className={style.actions}>
            <button onClick={openModal} className={style.buy}>
              Оформить заказ
            </button>
            <button className={style.share}>Поделиться</button>
          </div>
        </div>
      </div>
    </>
  );
};
