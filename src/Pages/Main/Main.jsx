import { Link } from 'react-router';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import style from './main.module.css';

const collections = [
  {
    img: 'https://static.insales-cdn.com/r/FU42bD6UcCY/rs:fit:410:0:1/q:100/plain/images/collections/1/5615/90215919/large_Frame_112.jpg@webp',
    text: 'Для девочек',
  },
  {
    img: 'https://static.insales-cdn.com/r/FqN0LMVuykk/rs:fit:410:0:1/q:100/plain/images/collections/1/5618/90215922/large_Frame_112__1_.jpg@webp',
    text: 'Для мальчиков',
  },
  {
    img: 'https://static.insales-cdn.com/r/l7UchXefv8U/rs:fit:410:0:1/q:100/plain/images/collections/1/5622/90215926/large_Frame_112__2_.jpg@webp',
    text: 'Для новорождённых',
  },
  {
    img: 'https://static.insales-cdn.com/r/z91QMJtfYBs/rs:fit:410:0:1/q:100/plain/images/collections/1/5627/90215931/large_Frame_112__3_.jpg@webp',
    text: 'Канцелярия',
  },
];

export const Main = () => {
  return (
    <div className={style.main}>
      <SideMenu />
      <div className={style.promoWidget}>
        <Link to={'/product/02'}>
          <img
            src="https://static.insales-cdn.com/r/S98eZiPUAfo/rs:fit:1438:0:1/q:100/plain/files/1/7499/24771915/original/banner_desktop__1__7b8f548f892c6c10008195e457122f79.jpg@webp"
            alt=""
          />
        </Link>
        <div className={style.promoWidget__footer}>
          <div className={style.footer__text}>
            <h1>Скидки на детскую мебель</h1>
            <span>
              Сезонные скидки, распродажи, ликвидация остатков! Все товары с сезонными
              скидками.
            </span>
          </div>
          <Link to={'/product/02'}>
            <button>Все товары</button>
          </Link>
        </div>
      </div>
      <div className={style.collections}>
        {collections.map((category) => {
          return (
            <div className={style.collectionCard}>
              <img src={category.img} />
              <span>{category.text}</span>
            </div>
          );
        })}
      </div>
      <div className={style.banners}>
        <div className="">
          <Link to={'/product/02'}>
            <img
              src={
                'https://static.insales-cdn.com/r/2f7AaPdAuug/rs:fill-down:688:327:1/q:100/plain/files/1/2824/24275720/original/6721__1_.jpg@jpg'
              }
              alt=""
            />
          </Link>
        </div>
        <div className="">
          <Link to={'/product/02'}>
            <img
              src={
                'https://static.insales-cdn.com/r/v0VWZmTtzFI/rs:fill-down:688:327:1/q:100/plain/files/1/2765/24275661/original/6722__1_.jpg@jpg'
              }
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className={style.benefits}>
        <div className={style.benefitsCard}>
          <img
            src={
              'https://static.insales-cdn.com/r/-Ml_z6FbC24/rs:fit:75:0:1/q:100/plain/files/1/1806/24315662/original/Truck__1_.png@webp'
            }
          />
          <span>Быстрая доставка</span>
        </div>
        <div className={style.benefitsCard}>
          <img
            src={
              'https://static.insales-cdn.com/r/1PGAe-iTzHA/rs:fit:75:0:1/q:100/plain/files/1/1817/24315673/original/Coins.png@webp'
            }
          />
          <span>Акции и бонусы</span>
        </div>
        <div className={style.benefitsCard}>
          <img
            src={
              'https://static.insales-cdn.com/r/j-NGUi9SqAE/rs:fit:75:0:1/q:100/plain/files/1/1820/24315676/original/MapPinLine.png@webp'
            }
          />
          <span>Шоурум в центре</span>
        </div>
      </div>
      <div className={style.video}>
        <video preload="metadata" controls>
          <source
            src="https://static.insales-cdn.com/files/1/4624/24875536/original/Untitled.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};
