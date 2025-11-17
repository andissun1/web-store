import { Link, useLocation } from 'react-router';
import style from './BreadCrumbs.module.css';
import { getCollectionName } from '../../utils';

export const Breadcrumbs = ({ collectionID, pageName }) => {
  const { pathname } = useLocation();

  console.log(123);

  let currentLink = '';

  const crumbs = pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index, array) => {
      //  Для отображения номальных имён пришлось преобразовывать адрес
      currentLink += `/${crumb}`;

      if (crumb === 'product') {
        return (
          <Link to={`/collection/${collectionID}`} className={style.crumb} key={crumb}>
            {getCollectionName(collectionID)}
          </Link>
        );
      }

      if (index === array.length - 1) crumb = pageName || crumb;

      return (
        <Link to={currentLink} className={style.crumb} key={crumb}>
          {crumb}
        </Link>
      );
    });

  return (
    <div className={style.breadCrumbs}>
      <Link to="/" className={style.crumb} key="/">
        Главная
      </Link>
      {crumbs}
    </div>
  );
};
