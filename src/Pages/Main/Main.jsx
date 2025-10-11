import { SideMenu } from '../../Components/SideMenu/SideMenu';
import style from './main.module.css';

export const Main = () => {
  return (
    <div className={style.main}>
      <SideMenu />
      Главная страница
    </div>
  );
};
