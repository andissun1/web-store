import { useEffect, useState } from 'react';
import { FormInput } from '../../FormInput/FormInput';
import style from './OneClickOrder.module.css';
import { Button } from '../../Button/Button';
import { validator } from '../../../utils';
import { useSelector } from 'react-redux';
import { Loader } from '../../Loader/Loader';

const schema = {
  fullname: {
    isRequired: { message: 'Обязательное поле' },
    min: { message: 'Должно быть более 10 символов', value: 10 },
    max: { message: 'Не более 40 символов', value: 40 },
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

export const OneClickOrder = ({ modalParams }) => {
  const user = useSelector((store) => store.user);
  if (!user) return <Loader />;

  const [formData, setFormData] = useState({
    fullname: user.fullname || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const [error, setError] = useState({});
  const isValid = Object.keys(error).length === 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const resultsOfvalidate = validator(formData, schema); // Валидация
    setError(resultsOfvalidate);
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    console.log(formData);
  };

  return (
    <div className={style.modalWindow}>
      <div className={style.content} onClick={(event) => event.stopPropagation()}>
        <h2>Заказ в один клик</h2>
        <form onSubmit={handleSubmit}>
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
          <FormInput
            name="address"
            value={formData.address}
            label="Адрес"
            onChange={handleChange}
            type="text"
            required={true}
            error={error?.address}
          />
          <button className={style.confirm} type="submit" disabled={!isValid}>
            Оформить заказ
          </button>
        </form>
        <Button
          className={style.close}
          icon="icon-times"
          onClick={() => modalParams.onClose()}
        />
      </div>
    </div>
  );
};
