import style from './FormInput.module.css';

export const FormInput = ({
  name,
  label,
  error,
  value,
  children,
  required,
  ...props
}) => {
  return (
    <div className={`${style.formInput} ${required ? style.required : ''}`}>
      {label && <label htmlFor={name}>{label}:</label>}
      <input name={name} value={value || ''} {...props} />
      {children}
      {value && error && <span>{error}</span>}
    </div>
  );
};
