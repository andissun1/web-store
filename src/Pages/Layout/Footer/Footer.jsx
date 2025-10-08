import style from './Footer.module.css';

export const Footer = (props) => {
  return (
    <footer className={style.footerLayout}>
      <div className={style.footerContent}>
        <a href="">
          <img
            src="https://static.insales-cdn.com/files/1/7649/24960481/original/Frame.png"
            alt="logo"
          />
        </a>
        <div className={style.wrapper}>
          <nav>
            <div className={style.column}>
              Компания
              <a href="">О нас</a>
              <a href="">Новости</a>
              <a href="">Реквизиты</a>
            </div>

            <div className={style.column}>
              Сервис
              <a href="">Оплата</a>
              <a href="">Доставка</a>
              <a href="">Обмен и возврат</a>
            </div>
          </nav>
          <div className={style.contactsWrapper}>
            <div>Контакты</div>
            <div className={style.phones}>
              <div>+7 (800) 800-80-80</div>
              <div>+7 (800) 800-80-80</div>
            </div>
            <div className={style.address}>
              г. Москва, 1-я Тверская-Ямская улица, дом 21
            </div>
            <div className={style.socialItems}>
              <a target="_blank" href="#" className="social-img-item">
                <img
                  src="https://static.insales-cdn.com/files/1/302/24346926/original/svg18.svg"
                  alt="Иконка социальной сети"
                />
              </a>
              <a target="_blank" href="#" className="social-img-item">
                <img
                  src="https://static.insales-cdn.com/files/1/1816/24987416/original/svg19.svg"
                  alt="Иконка социальной сети"
                />
              </a>
              <a target="_blank" href="#" className="social-img-item">
                <img
                  src="https://static.insales-cdn.com/files/1/304/24346928/original/svg16.svg"
                  alt="Иконка социальной сети"
                />
              </a>
            </div>
          </div>
        </div>
        <div className={style.rights}>
          Образец создан andissun на основе шаблонов insales
        </div>
      </div>
    </footer>
  );
};
