import { Link } from 'react-router';
import style from './Auth.module.css';

export const Auth = (props) => {
  return (
    <div className={style.auth}>
      <h2 className={style.title}>Вход в кабинет покупателя</h2>
      <form action="" className={style.form}>
        <div className={style.input}>
          <label htmlFor="login">Телефон или Email</label>
          <input id="login" type="text" />
        </div>
        <div className={style.input}>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="text" />
        </div>
        <div className={style.buttons}>
          <button>Войти</button>
          <Link to={'/resetPassword'} children="Восстановить пароль" />
          <Link to={'/register'} children="Зарегистрироваться" />
        </div>
      </form>
    </div>
  );
};
