import { useSelector } from 'react-redux';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import style from './Favorites.module.css';

export const Favorites = () => {
  const favorites = useSelector((store) => store.favorites.favoritesCards);

  console.log(favorites);

  return (
    <div className={style.favorites}>
      <h2>Избранное</h2>
      <div className={style.productList}>
        {favorites
          ? favorites.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          : 'Товары не добавлены'}
      </div>
    </div>
  );
};
