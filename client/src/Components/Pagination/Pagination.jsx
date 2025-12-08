import { useDispatch, useSelector } from 'react-redux';
import style from './Pagination.module.css';
import { Loader } from '../Loader/Loader';
import { getSearchResults } from '../../Store/searchReducer';
import { getCategory } from '../../Store/categoriesReducer';

export const LIMIT = 12;

export const Pagination = ({ collectionID, sort, limit }) => {
  const searchParams = useSelector((store) => store.search);
  const dispatch = useDispatch();

  if (searchParams.isLoadingSearch) return <Loader />;

  const { page: currentPage, lastPage } = searchParams.result;

  const nextPage = () => {
    collectionID
      ? dispatch(getCategory(`${collectionID}?${sort}`, limit || LIMIT, currentPage + 1))
      : dispatch(getSearchResults(searchParams.searchPhrase, LIMIT, currentPage + 1));
  };

  const prevPage = () => {
    collectionID
      ? dispatch(getCategory(`${collectionID}?${sort}`, limit || LIMIT, currentPage - 1))
      : dispatch(getSearchResults(searchParams.searchPhrase, LIMIT, currentPage - 1));
  };

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
