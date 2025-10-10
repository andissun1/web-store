import { Link, useLocation } from 'react-router';
import style from './Auth.module.css';
import { useEffect, useState } from 'react';
import { validator } from '../../utils';
import { FormInput } from '../../Components/FormInput/FormInput';
import { initialState, schemes } from './validateSchemes';
import { useDispatch, useSelector } from 'react-redux';
import { authorize, logout, register, resetPassword } from '../../Store/userReducer';

// Для референса test10@mail.ru 123123

export const Auth = (props) => {
  const address = useLocation().pathname.replaceAll('/', '');
  const [formData, setFormData] = useState(initialState[address]);
  const [error, setError] = useState({});
  const isValid = Object.keys(error).length === 0;
  const hash = useSelector((store) => store.user.hash);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(initialState[address]);
  }, [address]);

  useEffect(() => {
    const resultsOfvalidate = validator(formData, schemes[address]); // Валидация
    setError(resultsOfvalidate);
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;

    switch (address) {
      case 'auth':
        dispatch(authorize(formData.email, formData.password)).then((error) => {
          if (error) setError({ ...error, server: error });
        });
        break;

      case 'register':
        const formDataForServer = { ...formData };
        delete formDataForServer.repeatPassword;
        dispatch(register(formDataForServer)).then((error) => {
          if (error) setError({ ...error, server: error });
        });
        break;

      case 'resetPassword':
        dispatch(resetPassword(formData.email)).then(({ response, error }) => {
          if (error) return setError({ ...error, server: error });
          setError({ ...error, server: `Ваш новый пароль: ${response}` });
        });
        break;

      default:
        break;
    }
  }

  const authForm = (
    <>
      <FormInput
        name="email"
        value={formData.email}
        label="Телефон или Email"
        onChange={handleChange}
        type="text"
        error={error?.email}
      />

      <FormInput
        name="password"
        value={formData.password}
        label="Пароль"
        onChange={handleChange}
        type="current-password"
        error={error?.password}
      />
      <div className={style.buttons}>
        <button type="submit" disabled={!isValid}>
          Войти
        </button>
        <Link to={'/resetPassword'} children="Восстановить пароль" />
        <Link to={'/register'} children="Зарегистрироваться" />
      </div>
    </>
  );

  const resetPasswordForm = (
    <>
      <FormInput
        name="email"
        value={formData.email}
        label="Email"
        onChange={handleChange}
        type="text"
        error={error?.email}
      />
      <div className={style.buttons}>
        <button type="submit" disabled={!isValid}>
          Восстановить пароль
        </button>
        <Link to={'/auth'} children="Я вспомнил(-а) пароль!" />
      </div>
    </>
  );

  const registerForm = (
    <>
      <FormInput
        name="fullname"
        value={formData.fullname}
        label="Контактное лицо (ФИО)"
        onChange={handleChange}
        type="text"
        error={error?.fullname}
      />

      <FormInput
        name="phone"
        value={formData.phone}
        label="Контактный телефон"
        onChange={handleChange}
        type="tel"
        error={error?.phone}
      />

      <FormInput
        name="email"
        value={formData.email}
        label="Email"
        onChange={handleChange}
        type="text"
        error={error?.email}
      />

      <FormInput
        name="password"
        value={formData.password}
        label="Пароль"
        onChange={handleChange}
        type="new-password"
        error={error?.password}
      />

      <FormInput
        name="repeatPassword"
        value={formData.repeatPassword}
        label="Повторите пароль"
        onChange={handleChange}
        type="new-password"
        error={error?.repeatPassword}
      />

      <div className={style.buttons}>
        <button type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
        <Link to={'/auth'} children="У меня уже есть аккаунт" />
      </div>
    </>
  );

  let form = authForm;
  if (address === 'register') form = registerForm;
  if (address === 'resetPassword') form = resetPasswordForm;

  return (
    <div className={style.auth}>
      <h2 className={style.title}>
        {address === 'register' ? 'Регистрация' : 'Вход в кабинет покупателя'}
        <form onSubmit={handleSubmit} className={style.form}>
          {form}
          {error.server && <span>{error.server}</span>}
          {hash && (
            <button type="button" onClick={() => dispatch(logout())}>
              Выйти из аккаунта
            </button>
          )}
        </form>
      </h2>
    </div>
  );
};
