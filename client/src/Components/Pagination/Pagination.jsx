import { useDispatch, useSelector } from 'react-redux';
import style from './Pagination.module.css';
import { Loader } from '../Loader/Loader';
import { useState } from 'react';
import { getSearchResults } from '../../Store/appReducer';

const LIMIT_PRODUCTS_ON_PAGE = 12;

export const Pagination = (props) => {
  const searchParams = useSelector((store) => store.app.search);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  if (!searchParams) return <Loader />;

  const goToNextPage = () => {
    dispatch(
      getSearchResults(searchParams.searchPhrase, LIMIT_PRODUCTS_ON_PAGE, currentPage + 1)
    );
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    dispatch(
      getSearchResults(searchParams.searchPhrase, LIMIT_PRODUCTS_ON_PAGE, currentPage - 1)
    );
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={style.Pagination}>
      <button disabled={currentPage === 1} onClick={goToPrevPage}>
        Назад
      </button>
      <button>
        Страница {currentPage} из {searchParams?.result?.lastPage}
      </button>
      <button
        onClick={goToNextPage}
        disabled={currentPage === searchParams?.result?.lastPage}
      >
        Далее
      </button>
    </div>
  );
};
