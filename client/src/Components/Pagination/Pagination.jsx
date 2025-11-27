import { useDispatch, useSelector } from 'react-redux';
import style from './Pagination.module.css';
import { Loader } from '../Loader/Loader';
import { useState } from 'react';
import { getSearchResults } from '../../Store/appReducer';
import { getCategory } from '../../Store/categoriesReducer';

export const LIMIT = 10;

export const Pagination = ({ info, sort }) => {
  const searchParams = useSelector((store) => store.app.search);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  if (!searchParams) return <Loader />;

  const nextPage = () => {
    info
      ? dispatch(getCategory(`${info.collectionID}?${sort}`, LIMIT, currentPage + 1))
      : dispatch(getSearchResults(searchParams.searchPhrase, LIMIT, currentPage + 1));

    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    info
      ? dispatch(getCategory(`${info.collectionID}?${sort}`, LIMIT, currentPage - 1))
      : dispatch(getSearchResults(searchParams.searchPhrase, LIMIT, currentPage - 1));

    setCurrentPage(currentPage - 1);
  };

  const lastPage = info?.lastPage || searchParams?.result?.lastPage;

  return (
    <div className={style.Pagination}>
      <button disabled={currentPage === 1} onClick={prevPage}>
        Назад
      </button>
      <button className={style.info}>
        Страница {currentPage} из {lastPage}
      </button>
      <button onClick={nextPage} disabled={currentPage === lastPage}>
        Далее
      </button>
    </div>
  );
};
