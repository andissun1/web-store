import { Link, useLocation } from 'react-router';
import style from './BreadCrumbs.module.css';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div className={style.crumb} key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  if (location.pathname !== '/') {
    currentLink = 'main' + currentLink;
    crumbs.unshift(
      <div className={style.crumb} key={'main'}>
        <Link to="/">Главная</Link>
      </div>
    );
  }

  return <div className={style.breadCrumbs}>{crumbs}</div>;
};
