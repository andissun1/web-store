import style from './Button.module.css';

export const Button = ({ icon, children, type = 'button', ...props }) => {
  return (
    <button type={type} {...props}>
      {icon && <span className={icon} />}
      {children}
    </button>
  );
};
