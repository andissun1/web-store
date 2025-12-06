import { Link, useLocation } from 'react-router';
import style from './BreadCrumbs.module.css';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';

export const Breadcrumbs = ({ collectionID, pageName }) => {
  const { pathname } = useLocation();
  let collections = useSelector((store) => store.categories.categories);
  const isLoading = useSelector((store) => store.categories.isLoadingCategories);

  let currentLink = '';

  if (isLoading) return <Loader />;

  collections = collections.find(({ _id }) => _id === collectionID);

  const crumbs = pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index, array) => {
      //  Для отображения номальных имён пришлось преобразовывать адрес
      currentLink += `/${crumb}`;

      if (crumb === 'page') return;
      if (crumb === 'product') {
        return (
          <Link to={`/collection/${collectionID}`} className={style.crumb} key={crumb}>
            {collections.name}
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
