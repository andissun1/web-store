import { Link } from 'react-router';
import { FormInput } from '../FormInput/FormInput';
import style from './ResetPasswordForm.module.css';

export const ResetPasswordForm = ({ formData, error, handleChange }) => {
  return (
    <>
      <h2>Восстановление пароля</h2>
      <FormInput
        name="email"
        value={formData.email}
        label="Email"
        onChange={handleChange}
        type="text"
        error={error?.email}
      />
      <div className={style.buttons}>
        <button type="submit" disabled={Object.keys(error).length !== 0}>
          Восстановить пароль
        </button>
        <Link to={'/auth/login'} children="Я вспомнил(-а) пароль!" />
      </div>
    </>
  );
};
