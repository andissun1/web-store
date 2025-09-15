import style from './Header.module.css';

export const Header = (props) => {
  return (
    <header>
      <nav className={style.firstLine}>
        <div className={style.headerContent}>
          <ul>
            <li>
              <a>Оплата</a>
            </li>
            <li>
              <a>Доставка</a>
            </li>
            <li>
              <a>Обмен и возврат</a>
            </li>
          </ul>
          <div>Доставка с 8:00 до 23:00</div>
          <a href="tel:+78008008080">+7 (800) 800-80-80</a>
        </div>
      </nav>

      <nav className={style.secondLine}>
        <a href="">
          <img
            src="https://static.insales-cdn.com/files/1/7649/24960481/original/Frame.png"
            alt="logo"
          />
        </a>
        <button>
          <span className="icon-bars _show"></span>
          Каталог
        </button>
        <form action="">
          <input type="text" placeholder="Поиск" />
          <button>
            <span className="icon-search"></span>
          </button>
        </form>
        <div className={style.controlPannel}>
          <a className="icon-user" href=""></a>
          <a className="icon-favorites" href=""></a>
          <a className="icon-cart" href="">
            <span>10 860 P</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
