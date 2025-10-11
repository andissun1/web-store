import style from './ActionsPanel.module.css';

export const ActionsPanel = (props) => {
  return (
    <div className={style.actionsPanel}>
      <button className={style.addToCart}>
        <span className="button__icon icon-cart" /> В корзину
      </button>
      <button className={style.buy}>Купить в 1 клик</button>
      <button className={style.addToFavorite}>
        <span class="btn-icon icon-favorites-o" />
      </button>
    </div>
  );
};
