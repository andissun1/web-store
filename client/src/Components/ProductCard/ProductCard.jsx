import { useDispatch, useSelector } from 'react-redux';
import style from './ProductCard.module.css';
import { addToFavorites, removeFromFavorites } from '../../Store/favoritesReducer';
import { Link } from 'react-router';
import { addToCart } from '../../Store/cartReducer';
import { Button } from '../Button/Button';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favorites.favorites);
  const cart = useSelector((store) => store.cart.products);
  const isFavorite = favorites.includes(product.id);
  const isAddedToCart = cart.find((productInCart) => productInCart.id === product.id);

  const toggleHeart = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) return;

  return (
    <div className={style.productCard}>
      <div className={style.top}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image_URL} />
        </Link>
        <Button
          icon={isFavorite ? 'btn-icon icon-favorites-f' : 'btn-icon icon-favorites-o'}
          className={style.addToFavorites}
          onClick={toggleHeart}
        />
      </div>
      <div className={style.bottom}>
        <span className={style.name}>{product.name}</span>
        <span className={style.price}>{product.price} ₽</span>
        <Button
          icon={
            isAddedToCart
              ? 'add-cart-counter__detail-count'
              : 'add-cart-counter__btn-icon icon-cart'
          }
          className={style.addToCart}
          onClick={handleAddToCart}
          children={
            <>
              {isAddedToCart && <p>+ 1 шт</p>}
              {isAddedToCart && (
                <span className={style.counter}>{isAddedToCart.count}</span>
              )}
            </>
          }
        />
      </div>
    </div>
  );
};
