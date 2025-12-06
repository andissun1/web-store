import { Link } from 'react-router';
import { FormInput } from '../../Components/FormInput/FormInput';
import { HorizontalCard } from '../../Components/HorizontalCard/HorizontalCard';
import { Loader } from '../../Components/Loader/Loader';
import style from './NewOrder.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { validator } from '../../utils';
import { createOrder } from '../../Store/orderReducer';

export const DELIVERY_COST = 200;

const schema = {
  fullname: {
    isRequired: { message: 'Обязательное поле' },
    min: { message: 'Должно быть более 10 символов', value: 10 },
    max: { message: 'Не более 80 символов', value: 80 },
  },
  phone: {
    isRequired: { message: 'Обязательное поле' },
    min: { message: 'Должно быть более 6 символов', value: 6 },
    max: { message: 'Не более 20 символов', value: 20 },
  },
  address: {
    isRequired: { message: 'Обязательное поле' },
    min: { message: 'Укажите город, улицу и дом', value: 10 },
  },
};

export const NewOrder = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  if (!user || !cart) return <Loader />;

  const [formData, setFormData] = useState({
    fullname: user.fullname || '',
    phone: user.phone || '',
    address: user.address || '',
    payment: 'cash',
    comment: '',
  });

  const [error, setError] = useState({});
  const isValid = Object.keys(error).length === 0;

  useEffect(() => {
    const resultsOfvalidate = validator(formData, schema); // Валидация
    setError(resultsOfvalidate);
  }, [formData]);

  const total = cart.products.reduce(
    (acc, product) => (acc += product.price * product.count),
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    dispatch(
      createOrder({
        recipient: { name: formData.fullname, phone: formData.phone },
        address: formData.address,
        products: cart.products,
        deliveryCost: DELIVERY_COST,
        total: total + DELIVERY_COST,
        comment: formData.comment,
        payment: formData.payment,
      })
    );
  };

  return (
    <div className={style.newOrder}>
      <div className={style.leftCoulmn}>
        <h2>Оформление заказа</h2>
        {user.fullname ? (
          <>
            <h3>Вы авторизовались как {user.fullname}</h3>
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <Link to={'/auth/login'}>Сменить аккаунт</Link>
          </>
        ) : (
          <>
            <p>Для оформления заказа необходимо авторизоваться</p>
            <Link to={'/auth/login'}>Войти в аккаунт или создать его</Link>
          </>
        )}

        <h3>Доставка</h3>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="address"
            value={formData.address}
            label="Адрес"
            onChange={handleChange}
            type="text"
            required={true}
            placeholder="Город, улица, дом, квартира"
            error={error?.address}
          />
          <FormInput
            name="comment"
            value={formData.comment}
            label="Комментарии к заказу"
            onChange={handleChange}
            type="text"
            error={error?.comment}
          />
          <h3>Получатель</h3>
          <FormInput
            name="fullname"
            value={formData.fullname}
            label="Контактное лицо (ФИО)"
            onChange={handleChange}
            type="text"
            required={true}
            error={error?.fullname}
          />
          <FormInput
            name="phone"
            value={formData.phone}
            label="Контактный телефон"
            onChange={handleChange}
            type="text"
            required={true}
            error={error?.phone}
          />
          <h3>Оплата</h3>
          <select onChange={handleChange} name="payment" value={formData.payment}>
            <option value="cash">Наличные</option>
            <option value="card">Банковская карта</option>
          </select>
          <button className={style.submitButton} disabled={!user._id || !isValid}>
            Подтвердить заказ
          </button>
        </form>
      </div>

      <div className={style.rightCoulmn}>
        {cart.products.map((product) => (
          <HorizontalCard product={product} key={product._id} />
        ))}
        <div className={style.total}>
          <span>Сумма по товарам:</span>
          <span className={style.price}>{total.toLocaleString('ru-RU')} ₽</span>
          <span>Стоимость доставки:</span>
          <span className={style.price}>{DELIVERY_COST} ₽</span>
        </div>
        <div className={style.total}>
          <span>Итого:</span>{' '}
          <span className={style.price}>
            {(total + DELIVERY_COST).toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>
    </div>
  );
};
