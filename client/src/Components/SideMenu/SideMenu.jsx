import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import { SocialCircles } from '../SocialCircles/SocialCircles';
import style from './SideMenu.module.css';
import { Loader } from '../Loader/Loader';

export const SideMenu = () => {
  const categories = useSelector((store) => store.categories.categories);
  const isLoading = useSelector((store) => store.categories.isLoadingCategories);

  if (isLoading) return <Loader />;

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
    </div>
  );
};
