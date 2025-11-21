import { Link } from 'react-router';
import { SocialCircles } from '../../../Components/SocialCircles/SocialCircles';
import style from './Footer.module.css';

const companyPages = [
  { url: '', title: 'О наc' },
  { url: '', title: 'Новости' },
  { url: '', title: 'Реквизиты' },
];
const servicePages = [
  { url: '', title: 'Оплата' },
  { url: '', title: 'Доставка' },
  { url: '', title: 'Обмен и возврат' },
];

export const Footer = () => (
  <footer className={style.purpleLine}>
    <div className={style.footerContent}>
      <a href="">
        <img src="https://static.insales-cdn.com/files/1/7649/24960481/original/Frame.png" />
      </a>
      <div className={style.wrapper}>
        <nav>
          <div className={style.column}>
            Компания
            {companyPages.map((page) => (
              <Link to={page.url} key={page.title}>
                {page.title}
              </Link>
            ))}
          </div>

          <div className={style.column}>
            Сервис
            {servicePages.map((page) => (
              <Link to={page.url} key={page.title}>
                {page.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className={style.contactsWrapper}>
          <h4>Контакты</h4>
          <div className={style.phones}>
            <div>+7 (800) 800-80-80</div>
            <div>+7 (800) 800-80-80</div>
          </div>
          <div className={style.address}>
            г. Москва, 1-я Тверская-Ямская улица, дом 21
          </div>
          <SocialCircles size="30px" />
        </div>
      </div>
      <div className={style.rights}>
        Сайт создан в учебных целях на основе дизайна insales
      </div>
    </div>
  </footer>
);
