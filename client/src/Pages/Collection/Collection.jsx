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
  const products = useSelector((store) => store.search.result?.products);
  const isLoadingProducts = useSelector((store) => store.search.isLoadingSearch);

  const count = useSelector((store) => store.search.result?.count);
  const lastPage = useSelector((store) => store.search.result?.lastPage);
  const categories = useSelector((store) => store.categories.categories);

  const [sort, setSort] = useState('price=asc');

  useEffect(() => {
    dispatch(getCategory(`${collectionID}?${sort}`));
  }, [collectionID, sort]);

  const categoryName = categories?.find((item) => item._id === collectionID)?.name;

  return (
    <>
      <div className={style.collection}>
        <SideMenu />
        <h2>{categoryName}</h2>
        <span>Товаров: {count}</span>
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
          {isLoadingProducts ? (
            <Loader />
          ) : (
            products.map((product) => <ProductCard product={product} key={product._id} />)
          )}
        </div>
        {lastPage > 1 && (
          <Pagination collectionID={collectionID} sort={sort} limit={10} />
        )}
      </div>
    </>
  );
};
