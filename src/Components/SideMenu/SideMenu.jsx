import { NavLink } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategory } from '../../Store/appReducer';
import { SocialCircles } from '../SocialCircles/SocialCircles';
import { PopularProductsWidget } from '../PopularProductsWidget/PopularProductsWidget';
import style from './SideMenu.module.css';

const POPULAR = 'c14';

export const SideMenu = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.app.categories);
  const products = useSelector((store) => store.app.allProducts).slice(0, 3);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCategory(POPULAR));
  }, []);

  if (!categories) return <h2>Загрузка...</h2>;

  return (
    <div className={style.SideMenu}>
      <nav>
        {categories.map((category) => (
          <NavLink
            to={`/collection/${category.id}`}
            children={category.name}
            className={style.navLink}
            key={category.id}
          />
        ))}
      </nav>
      <SocialCircles title="Подписывайтесь" />
      <PopularProductsWidget products={products} />
    </div>
  );
};
