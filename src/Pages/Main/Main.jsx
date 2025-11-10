import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { PromoWidget } from '../../Components/promoWidget/promoWidget';
import { CollectionsWidget } from '../../Components/CollectionsWidget/CollectionsWidget';
import { Banners } from '../../Components/Banners/Banners';
import { BenefitsWidget } from '../../Components/BenefitsWidget/BenefitsWidget';
import style from './main.module.css';

const videoInfo = {
  src: 'https://static.insales-cdn.com/files/1/4624/24875536/original/Untitled.mp4',
};

export const Main = () => {
  return (
    <div className={style.main}>
      <SideMenu />
      <PromoWidget />
      <CollectionsWidget />
      <Banners />
      <BenefitsWidget />

      <video preload="metadata" controls className={style.video}>
        <source src={videoInfo.src} type="video/mp4" />
      </video>
    </div>
  );
};
