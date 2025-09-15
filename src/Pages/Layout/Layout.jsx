import { Outlet } from 'react-router';
import style from './Layout.module.css';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const Layout = (props) => {
  return (
    <>
      <Header />
      <div className={style.app}>
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  );
};
