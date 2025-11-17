import { useSelector } from 'react-redux';
import style from './ErorPage.module.css';

export const ErorPage = (props) => {
  const appErrors = useSelector((store) => store.app.errors);
  const errors = appErrors || 'Страница не найдена';

  return <div className={style.erorPage}>{errors}</div>;
};
