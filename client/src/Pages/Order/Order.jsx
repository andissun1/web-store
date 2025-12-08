import { useEffect } from 'react';
import style from './Order.module.css';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../Store/orderReducer';
import { Loader } from '../../Components/Loader/Loader';
import { OrderTable } from '../../Components/OrderTable/OrderTable';

export const Order = (props) => {
  const orderID = useParams().id;
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  const isLoading = useSelector((store) => store.order.isLoadingOrder);

  useEffect(() => {
    dispatch(getOrder(orderID));
  }, []);

  if (isLoading) return <Loader />;

  const preparedData = {
    'Дата оформления': new Date(order.createdAt)
      .toLocaleString()
      .replace(',', '')
      .slice(0, -3),
    Сумма: order.total.toLocaleString('ru-RU'),
    Cтатус: order.status,
    'Способ оплаты':
      order.payment === 'card' ? 'Картой при получении' : 'Наличными курьеру',
    'Способ доставки': 'Курьером (Доставка курьером в пределах области)',
    'Адрес доставки': order.address,
    Получатель: order.recipient.name,
    'Контактный номер': order.recipient.phone,
    Комментарий: order.comment,
  };

  return (
    <div className={style.Order}>
      <h2>Заказ №{order.numOfOrder} </h2>
      <h3>Информация о заказе</h3>
      <ul className={style.info}>
        {Object.entries(preparedData).map(([key, value]) => {
          if (!value) return;
          if (key === 'Сумма')
            return (
              <li key={key}>
                <span className={style.key}>{key}</span> <strong>{value} ₽</strong>
              </li>
            );

          return (
            <li key={key}>
              <span className={style.key}>{key}</span> <span>{value}</span>
            </li>
          );
        })}
      </ul>

      <h3>Состав заказа</h3>
      <OrderTable order={order} />
    </div>
  );
};
