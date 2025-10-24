import { useDispatch, useSelector } from 'react-redux';
import style from './HorizontalCard.module.css';
import { addToCart, decreaseProductCount, actions } from '../../Store/cartReducer';
import { addToFavorites, removeFromFavorites } from '../../Store/appReducer';
import { useNavigate } from 'react-router';

export const HorizontalCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.app.favorites);
  const isFavorite = favorites.includes(product.id);
  const navigate = useNavigate();

  const handleRemoveItem = () => {
    dispatch(actions.removeFromCart(product.id));
  };

  const toggleHeart = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };

  const increaseCount = (params) => {
    dispatch(addToCart(product.id));
  };

  const decreaseCount = (params) => {
    dispatch(decreaseProductCount(product.id));
  };

  const goToCard = (params) => {
    navigate(`/product/${product.id}`);
  };

  if (!product) return;

  return (
    <div className={style.productList}>
      <div className={style.horizontalCard}>
        <div className={style.descr}>
          <img src={product.image_URL} onClick={goToCard} />
          <h2>{product.name}</h2>
          <div className={style.cardActions}>
            <button onClick={toggleHeart}>
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
