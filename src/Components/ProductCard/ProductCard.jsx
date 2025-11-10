import { useDispatch, useSelector } from 'react-redux';
import style from './ProductCard.module.css';
import { addToFavorites, removeFromFavorites } from '../../Store/appReducer';
import { Link } from 'react-router';
import { addToCart } from '../../Store/cartReducer';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.app.favorites);
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
          <span
            className={
              isAddedToCart
                ? 'add-cart-counter__detail-count'
                : 'add-cart-counter__btn-icon icon-cart'
            }
          >
            {isAddedToCart && <p>+ 1 шт</p>}
          </span>
          {isAddedToCart && <span className={style.counter}>{isAddedToCart.count}</span>}
        </button>
      </div>
    </div>
  );
};
