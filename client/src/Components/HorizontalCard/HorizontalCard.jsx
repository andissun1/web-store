import { useDispatch, useSelector } from 'react-redux';
import style from './HorizontalCard.module.css';
import { addToCart, decreaseProductCount, actions } from '../../Store/cartReducer';
import { addToFavorites, removeFromFavorites } from '../../Store/favoritesReducer';
import { useNavigate } from 'react-router';

export const HorizontalCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favorites.favorites);
  const isFavorite = favorites.includes(product._id);
  const navigate = useNavigate();

  const handleRemoveItem = () => dispatch(actions.removeFromCart(product._id));
  const increaseCount = () => dispatch(addToCart(product));
  const decreaseCount = () => dispatch(decreaseProductCount(product._id));
  const goToProduct = () => navigate(`/product/${product._id}`);

  const toggleHeart = () => {
    isFavorite
      ? dispatch(removeFromFavorites(product._id))
      : dispatch(addToFavorites(product._id));
  };

  if (!product) return;

  return (
    <div className={style.productList}>
      <div className={style.horizontalCard}>
        <div className={style.descr}>
          <img src={product.image_URL} onClick={goToProduct} />
          <h2>{product.name}</h2>
          <div className={style.cardActions}>
            <button onClick={toggleHeart} className={style.addToFavorites}>
              <span
                className={
                  isFavorite ? 'btn-icon icon-favorites-f' : 'btn-icon icon-favorites'
                }
              />
              В избранном
            </button>
            <button onClick={handleRemoveItem}>
              <span className="icon icon-trash" />
              Удалить
            </button>
          </div>
        </div>
        <div className={style.secondDescription}>
          <span className={style.price}>{product.price} ₽</span>
          <div className={style.controller}>
            <button onClick={decreaseCount}>
              <span className="icon icon-minus" />
            </button>
            <input type="text" value={product.count} disabled />
            <button onClick={increaseCount}>
              <span className="icon icon-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
