import { Link, useNavigate } from 'react-router';
import style from './MobileHeader.module.css';
import { Button } from '../../../../Components/Button/Button';
import { useRef, useState } from 'react';
import { SideMenu } from '../../../../Components/SideMenu/SideMenu';
import { useDispatch } from 'react-redux';
import { getSearchResults } from '../../../../Store/searchReducer';
import { LIMIT } from '../../../../Components/Pagination/Pagination';

export const MobileHeader = ({ isAdmin }) => {
  const SideBar = useRef(null);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSideBar = () => {
    SideBar.current.style.display = 'block';
  };

  const closeSideBar = () => {
    SideBar.current.style.display = 'none';
  };

  const openSearch = (event) => {
    event.stopPropagation();
    setIsOpenSearch(true);
  };

  const closeSearch = (event) => {
    event.stopPropagation();
    setIsOpenSearch(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target.search;
    dispatch(getSearchResults(value, LIMIT, 1));
    navigate('/search');
  };

  return (
    <header className={style.MobileHeader}>
      <div className={style.purpleLine}>
        <Button onClick={openSideBar} className="icon-bars" />
        <Link to={'/'} className={style.logo}>
          <img src="https://static.insales-cdn.com/files/1/7649/24960481/original/Frame.png" />
        </Link>
        <Link to={'/shopCart'} className="icon-cart" />
      </div>

      <div className={style.sideBar} ref={SideBar} onClick={closeSideBar}>
        <div className={style.purpleLine}>
          <Button onClick={closeSideBar} className="icon-times" />
        </div>
        <div className={style.grayLine}>
          {isOpenSearch ? (
            <form onSubmit={handleSubmit} className={style.search}>
              <input
                type="text"
                placeholder="Поиск"
                name="search"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
              <Button icon="icon-search" type="submit" />
              <Button className="icon-times" onClick={closeSearch} />
            </form>
          ) : (
            <nav className={style.controlPannel}>
              <Link to={'/auth/login'} className="icon-user" />
              {isAdmin && <Link to={'/adminConsole'} className="icon-tasks" />}
              <Link to={'/favorites'} className="icon-favorites" />
              <Link to={'/shopCart'} className="icon-cart" />
              <Button onClick={openSearch} className="icon-search" />
            </nav>
          )}
        </div>
        <div>
          <h4>Каталог</h4>
          <SideMenu />
        </div>
      </div>
    </header>
  );
};
