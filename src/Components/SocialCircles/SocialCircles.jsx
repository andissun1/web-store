import style from './SocialCircles.module.css';

const contactIcons = [
  {
    img: 'https://static.insales-cdn.com/files/1/302/24346926/original/svg18.svg',
    src: 'https://ok.ru',
  },
  {
    img: 'https://static.insales-cdn.com/files/1/1816/24987416/original/svg19.svg',
    src: 'https://dzen.ru',
  },
  {
    img: 'https://static.insales-cdn.com/files/1/304/24346928/original/svg16.svg',
    src: 'https://vk.com',
  },
];

export const SocialCircles = ({ size = '47px', title }) => (
  <div>
    {title && <h3>{title}</h3>}
    <div className={style.icons}>
      {contactIcons.map((icon) => (
        <a target="_blank" href={icon.src} className="social-img-item" key={icon.src}>
          <img src={icon.img} style={{ height: 'auto', width: size }} />
        </a>
      ))}
    </div>
  </div>
);
