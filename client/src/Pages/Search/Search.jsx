import { useSelector } from 'react-redux';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { Loader } from '../../Components/Loader/Loader';
import style from './Search.module.css';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';

// Функция дебаунс, которая может пригодиться
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
  if (typeof result === 'object' && !result) return <h2>Введите запрос</h2>; // Проверяю на null
  if (!result) return <Loader />;

  return (
    <div className={style.search}>
      <Breadcrumbs pageName="Поиск" />
      <h2>Результаты поиска</h2>
      <div className={style.productList}>
        {result.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
