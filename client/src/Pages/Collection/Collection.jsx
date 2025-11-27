import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getCategory } from '../../Store/categoriesReducer';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import style from './collection.module.css';
import { Loader } from '../../Components/Loader/Loader';
import { Pagination } from '../../Components/Pagination/Pagination';
import { useState } from 'react';

export const Collection = (props) => {
  const dispatch = useDispatch();
  const collectionID = useParams().id;
  const products = useSelector((store) => store.products);
  const categories = useSelector((store) => store.categories);

  // Сохраняю необходимые данные для пагинации
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [sort, setSort] = useState('price=asc');

  useEffect(() => {
    dispatch(getCategory(`${collectionID}?${sort}`)).then(setPaginationInfo);
  }, [collectionID, sort]);

  if (!products || !paginationInfo || !categories) return <Loader />;

  const categoryName = categories?.find((item) => item._id === collectionID)?.name;

  return (
    <>
      <div className={style.collection}>
        <SideMenu />
        <h2>{categoryName}</h2>
        <span>Товаров: {paginationInfo?.count}</span>
        <div className={style.filtersPanel}>
          <select
            name="sort"
            id="sort"
            className={style.selector}
            onChange={({ target }) => setSort(target.value)}
            defaultValue={'price=asc'}
          >
            <option value="price=desc">по убыванию цены</option>
            <option value="price=asc">по возрастанию цены</option>
            <option value="createdAt=asc">Сначала новые</option>
            <option value="name=asc">по названию</option>
          </select>
        </div>
        <div className={style.productList}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        {paginationInfo.lastPage > 1 && (
          <Pagination info={{ ...paginationInfo, collectionID }} sort={sort} />
        )}
      </div>
    </>
  );
};
