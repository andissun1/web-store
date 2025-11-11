import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../Store/appReducer';
import { addToCart, decreaseProductCount } from '../../Store/cartReducer';
import style from './ActionsPanel.module.css';

export const ActionsPanel = ({ product }) => {
  const favorites = useSelector((store) => store.app.favorites);
  const isFavorite = favorites.includes(product.id);
  const cart = useSelector((store) => store.cart.products);
  const isAddedToCart = cart.find((productInCart) => productInCart.id === product.id);
  const dispatch = useDispatch();

  const toggleHeart = () => {
    isFavorite
      ? dispatch(removeFromFavorites(product.id))
      : dispatch(addToFavorites(product.id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const increaseCount = (params) => {
    dispatch(addToCart(product));
  };

  const decreaseCount = (params) => {
    dispatch(decreaseProductCount(product.id));
  };

  return (
    <div className={style.actionsPanel}>
      {isAddedToCart ? (
        <>
          <button onClick={decreaseCount} className={style.controller}>
            <span className="icon icon-minus" />
          </button>
          <button className={style.addToCart} onClick={handleAddToCart}>
            <span className="button__icon icon-cart" />
            {`В корзине ${isAddedToCart.count} шт`}
          </button>
          <button onClick={increaseCount} className={style.controller}>
            <span className="icon icon-plus" />
          </button>
        </>
      ) : (
        <button className={style.addToCart} onClick={handleAddToCart}>
          <span className="button__icon icon-cart" /> В корзину
        </button>
      )}
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
