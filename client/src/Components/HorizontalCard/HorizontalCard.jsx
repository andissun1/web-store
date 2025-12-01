import { useDispatch, useSelector } from 'react-redux';
import style from './HorizontalCard.module.css';
import { addToCart, decreaseProductCount, actions } from '../../Store/cartReducer';
import { addToFavorites, removeFromFavorites } from '../../Store/favoritesReducer';
import { useNavigate } from 'react-router';
import { Button } from '../Button/Button';

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
            <Button
              icon={isFavorite ? 'btn-icon icon-favorites-f' : 'btn-icon icon-favorites'}
              onClick={toggleHeart}
              className={style.addToFavorites}
              children={'В избранном'}
            />
            <Button icon="icon icon-trash" onClick={handleRemoveItem}>
              Удалить
            </Button>
          </div>
        </div>
        <div className={style.secondDescription}>
          <span className={style.price}>{product.price} ₽</span>
          <div className={style.controller}>
            <Button icon="icon icon-minus" onClick={decreaseCount} />
            <input type="text" value={product.count} disabled />
            <Button icon="icon icon-plus" onClick={increaseCount} />
          </div>
        </div>
      </div>
    </div>
  );
};
