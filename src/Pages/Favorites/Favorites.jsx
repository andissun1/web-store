import { useSelector } from 'react-redux';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import style from './Favorites.module.css';

export const Favorites = () => {
  const favorites = useSelector((store) => store.favorites.favoritesCards);

  return (
    <div className={style.favorites}>
      <h2>Избранное</h2>
      <div className={style.productList}>
        {favorites.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
