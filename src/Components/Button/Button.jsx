import style from './Button.module.css';

export const Button = ({ icon, children, ...props }) => {
  return (
    <button type="submit">
      {icon && <span className={icon} {...props} />}
      {children}
    </button>
  );
};
