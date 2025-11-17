import { Link } from 'react-router';
import style from './Banners.module.css';

const bannersInfo = [
  {
    img: 'https://static.insales-cdn.com/r/2f7AaPdAuug/rs:fill-down:688:327:1/q:100/plain/files/1/2824/24275720/original/6721__1_.jpg@jpg',
    link: '/collection/09',
  },
  {
    img: 'https://static.insales-cdn.com/r/v0VWZmTtzFI/rs:fill-down:688:327:1/q:100/plain/files/1/2765/24275661/original/6722__1_.jpg@jpg',
    link: '/collection/03',
  },
];

export const Banners = () => {
  return (
    <div className={style.banners}>
      {bannersInfo.map((banner) => (
        <Link to={banner.link} key={banner.link}>
          <img src={banner.img} />
        </Link>
      ))}
    </div>
  );
};
