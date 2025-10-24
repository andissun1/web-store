import { useDispatch, useSelector } from 'react-redux';
import style from './ProductCard.module.css';
import { addToFavorites, removeFromFavorites } from '../../Store/appReducer';
import { Link } from 'react-router';
import { addToCart } from '../../Store/cartReducer';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.app.favorites);
  const isFavorite = favorites.includes(product.id);

  const toggleHeart = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  if (!product) return;

  return (
    <div className={style.productCard}>
      <div className={style.top}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image_URL} />
        </Link>
        <button className={style.addToFavorites} onClick={toggleHeart}>
          <span
            className={
              isFavorite ? 'btn-icon icon-favorites-f' : 'btn-icon icon-favorites-o'
            }
          />
        </button>
      </div>
      <div className={style.bottom}>
        <span className={style.name}>{product.name}</span>
        <span className={style.price}>{product.price} ₽</span>
        <button className={style.addToCart} onClick={handleAddToCart}>
          <span className="add-cart-counter__btn-icon icon-cart" />
        </button>
      </div>
    </div>
  );
};
