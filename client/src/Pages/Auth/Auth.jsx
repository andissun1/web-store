import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { validator } from '../../utils';
import { initialState, schemes } from './validateSchemes';
import { useDispatch, useSelector } from 'react-redux';
import { authorize, logout, register, resetPassword } from '../../Store/userReducer';
import { RegisterForm } from '../../Components/RegisterForm/RegisterForm';
import { ResetPasswordForm } from '../../Components/ResetPasswordForm/ResetPasswordForm';
import { AuthForm } from '../../Components/AuthForm/AuthForm';
import style from './Auth.module.css';

// Для тестирования: test10@mail.ru 123123

export const Auth = () => {
  const address = useParams().type;
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

  function handleLogout() {
    dispatch(logout());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;

    try {
      switch (address) {
        case 'login': {
          const error = await dispatch(authorize(formData.email, formData.password));
          if (error) throw new Error(error);
          break;
        }

        case 'register': {
          const { resetPassword, ...formDataForServer } = formData;
          const error = await dispatch(register(formDataForServer));
          if (error) throw new Error(error);
          break;
        }

        case 'resetPassword': {
          const { response, error } = await dispatch(resetPassword(formData.email));
          if (error) throw new Error(error);
          throw new Error(`Ваш новый пароль: ${response}`);
          break;
        }

        default:
          break;
      }
    } catch (error) {
      setError({ ...error, server: error.message });
    }
  }

  let inputs = <AuthForm error={error} formData={formData} handleChange={handleChange} />;

  if (address === 'register')
    inputs = (
      <RegisterForm error={error} formData={formData} handleChange={handleChange} />
    );

  if (address === 'resetPassword')
    inputs = (
      <ResetPasswordForm error={error} formData={formData} handleChange={handleChange} />
    );

  return (
    <div className={style.auth}>
      <form onSubmit={handleSubmit} className={style.form}>
        {inputs}
        {error.server && <span>{error.server}</span>}
        {hash && (
          <button type="button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        )}
      </form>
    </div>
  );
};
