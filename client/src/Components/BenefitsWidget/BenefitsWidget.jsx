import style from './BenefitsWidget.module.css';

const benefitsInfo = [
  {
    img: 'https://static.insales-cdn.com/r/-Ml_z6FbC24/rs:fit:75:0:1/q:100/plain/files/1/1806/24315662/original/Truck__1_.png@webp',
    title: 'Быстрая доставка',
  },
  {
    img: 'https://static.insales-cdn.com/r/1PGAe-iTzHA/rs:fit:75:0:1/q:100/plain/files/1/1817/24315673/original/Coins.png@webp',
    title: 'Акции и бонусы',
  },
  {
    img: 'https://static.insales-cdn.com/r/j-NGUi9SqAE/rs:fit:75:0:1/q:100/plain/files/1/1820/24315676/original/MapPinLine.png@webp',
    title: 'Шоурум в центре',
  },
];

export const BenefitsWidget = (props) => {
  return (
    <div className={style.benefits}>
      {benefitsInfo.map((card) => (
        <div className={style.benefitsCard} key={card.img}>
          <img src={card.img} />
          <span>{card.title}</span>
        </div>
      ))}
    </div>
  );
};
