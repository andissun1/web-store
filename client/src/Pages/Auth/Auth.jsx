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

export const Auth = () => {
  const address = useParams().type;
  const [formData, setFormData] = useState(initialState[address]);
  const [error, setError] = useState({});
  const isValid = Object.keys(error).length === 0;
  const user = useSelector((store) => store.user._id);
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

    switch (address) {
      case 'login': {
        const serverError = await dispatch(authorize(formData.email, formData.password));
        if (serverError) setError({ ...error, server: serverError });
        break;
      }

      case 'register': {
        const { resetPassword, ...formDataForServer } = formData;
        const serverError = await dispatch(register(formDataForServer));
        setError({ ...error, server: serverError });
        break;
      }

      case 'resetPassword': {
        const { newPassword } = await dispatch(resetPassword(formData.email));
        setError({ ...error, server: `Ваш новый пароль: ${newPassword}` });
        break;
      }

      default:
        break;
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
        {user && (
          <button type="button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        )}
      </form>
    </div>
  );
};
