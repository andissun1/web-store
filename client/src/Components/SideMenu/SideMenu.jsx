import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Store/categoriesReducer';
import { SocialCircles } from '../SocialCircles/SocialCircles';
import { PopularProductsWidget } from '../PopularProductsWidget/PopularProductsWidget';
import style from './SideMenu.module.css';

export const SideMenu = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categories);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
    // .then((collections) => {
    // const popular = collections.find(({ name }) => name === 'Популярное');
    // Это плохо, нужно переделать
    // if (path.pathname === '/') dispatch(getCategory(popular._id)).then(setProducts);
    // });
  }, []);

  if (!categories) return <h2>Загрузка...</h2>;

  return (
    <div className={style.SideMenu}>
      <nav>
        {categories.map((category) => (
          <NavLink
            to={`/collection/${category._id}`}
            children={category.name}
            className={style.navLink}
            key={category._id}
          />
        ))}
      </nav>
      <SocialCircles title="Подписывайтесь" />
      <PopularProductsWidget products={products} />
    </div>
  );
};
