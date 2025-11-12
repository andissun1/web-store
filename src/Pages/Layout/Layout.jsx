import { Outlet } from 'react-router';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Modal } from '../../Components/Modal/Modal';
import style from './Layout.module.css';

export const Layout = () => (
  <>
    <Header />
    <div className={style.page} children={<Outlet />} />
    <Footer />
    <Modal />
  </>
);
