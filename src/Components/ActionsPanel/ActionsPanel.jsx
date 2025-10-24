import { useDispatch, useSelector } from 'react-redux';
import style from './ActionsPanel.module.css';
import { addToFavorites, removeFromFavorites } from '../../Store/appReducer';

export const ActionsPanel = ({ product }) => {
  const favorites = useSelector((store) => store.app.favorites);
  const isFavorite = favorites.includes(product.id);
  const dispatch = useDispatch();

  const toggleHeart = (event) => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };

  return (
    <div className={style.actionsPanel}>
      <button className={style.addToCart}>
        <span className="button__icon icon-cart" /> В корзину
      </button>
      <button className={style.buy}>Купить в 1 клик</button>
      <button className={style.addToFavorite} onClick={toggleHeart}>
        <span
          className={
            isFavorite ? 'btn-icon icon-favorites-f' : 'btn-icon icon-favorites-o'
          }
        />
      </button>
    </div>
  );
};
