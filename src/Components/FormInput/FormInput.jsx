import style from './FormInput.module.css';

export const FormInput = ({ name, label, error, value, ...props }) => {
  return (
    <div className={style.formInput}>
      <label htmlFor={name}>{label}:</label>
      <input name={name} value={value || ''} {...props} />
      {value && error && <span>{error}</span>}
    </div>
  );
};
