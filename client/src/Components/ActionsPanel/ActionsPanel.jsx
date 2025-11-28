import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../Store/favoritesReducer';
import { addToCart, decreaseProductCount } from '../../Store/cartReducer';
import style from './ActionsPanel.module.css';
import { Button } from '../Button/Button';
import { getConfirmation } from '../../Store/modalReducer';

export const ActionsPanel = ({ product }) => {
  const favorites = useSelector((store) => store.favorites.favorites);
  const isFavorite = favorites.includes(product._id);
  const cart = useSelector((store) => store.cart.products);
  const isAddedToCart = cart.find((productInCart) => productInCart._id === product._id);
  const dispatch = useDispatch();

  const toggleHeart = () => {
    isFavorite
      ? dispatch(removeFromFavorites(product._id))
      : dispatch(addToFavorites(product._id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const increaseCount = () => {
    dispatch(addToCart(product));
  };

  const decreaseCount = () => {
    dispatch(decreaseProductCount(product._id));
  };

  const openModal = () => {
    dispatch(getConfirmation({ type: 'OneClickOrder' }));
  };

  return (
    <div className={style.actionsPanel}>
      {isAddedToCart ? (
        <>
          <Button
            icon="icon icon-minus"
            onClick={decreaseCount}
            className={style.controller}
          />
          <Button
            icon="button__icon icon-cart"
            className={style.addToCart}
            onClick={handleAddToCart}
            children={`В корзине ${isAddedToCart.count} шт`}
          />
          <Button
            icon="icon icon-plus"
            onClick={increaseCount}
            className={style.controller}
          />
        </>
      ) : (
        <Button
          icon="button__icon icon-cart"
          className={style.addToCart}
          onClick={handleAddToCart}
          children="В корзину"
        />
      )}
      <button className={style.buy} onClick={openModal}>
        Купить в 1 клик
      </button>
      <Button
        icon={isFavorite ? 'btn-icon icon-favorites-f' : 'btn-icon icon-favorites-o'}
        className={style.addToFavorite}
        onClick={toggleHeart}
      />
    </div>
  );
};
