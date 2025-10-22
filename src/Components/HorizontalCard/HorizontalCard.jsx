import style from './HorizontalCard.module.css';

export const HorizontalCard = (props) => {
  return (
    <div className={style.productList}>
      <div className={style.horizontalCard}>
        <div className={style.descr}>
          <img src="https://static.insales-cdn.com/images/products/1/2140/618743900/large_card__7_.png" />
          <h2>Мягкая игрушка</h2>
          <div className={style.cardActions}>
            <button>
              <span className="btn-icon icon-favorites"></span>В избранном
            </button>
            <button>
              <span className="icon icon-trash"></span>Удалить
            </button>
          </div>
        </div>
        <div className={style.secondDescription}>
          <span className={style.price}>3 660 ₽</span>
          <div className={style.controller}>
            <button>
              <span className="icon icon-minus"></span>
            </button>
            <input type="text" defaultValue={'5'} />
            <button>
              <span className="icon icon-plus"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
