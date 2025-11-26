import { useSelector } from 'react-redux';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import style from './Search.module.css';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../Components/Pagination/Pagination';

/* const debounce = (fun, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(fun, delay, ...args);
  };
}; */

export const Search = () => {
  const result = useSelector((store) => store.app.search.result);
  const error = useSelector((store) => store.app.search.error);

  // const debouncedSearch = useMemo(() => debounce(onSearch, 500), []);
  // const handlesearch = ({ target }) => debouncedSearch(target.value);

  if (error) return <h2>{error}</h2>;
  if (!result) return <h2>Введите запрос</h2>;
  if (result.products.length === 0) return <h2>Ничего не найдено</h2>;

  return (
    <div className={style.search}>
      <Breadcrumbs pageName="Поиск" />
      <h2>Результаты поиска</h2>
      <div className={style.productList}>
        {result.products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
