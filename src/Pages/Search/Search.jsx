import { useSelector } from 'react-redux';
import style from './Search.module.css';
import { ProductCard } from '../../Components/ProductCard/ProductCard';

// Функция дебаунс, которая не пригодилась
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
  if (typeof result === 'object' && !result) return <h2>Введите запрос</h2>;
  if (!result) return <h2>Загрузка</h2>;

  return (
    <div className={style.search}>
      <h2>Результаты поиска</h2>
      <div className={style.productList}>
        {result.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
