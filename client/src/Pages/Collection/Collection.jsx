import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getCategory, sortCollection } from '../../Store/categoriesReducer';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import style from './collection.module.css';
import { Loader } from '../../Components/Loader/Loader';

export const Collection = (props) => {
  const dispatch = useDispatch();
  const collectionID = useParams().id;
  const products = useSelector((store) => store.products);
  const categories = useSelector((store) => store.categories);
  const collectionName = categories?.find((item) => item._id === collectionID)?.name;

  const handleSort = ({ target }) => {
    dispatch(sortCollection(collectionID, target.value));
  };

  useEffect(() => {
    console.log(collectionID);

    dispatch(getCategory(collectionID));
  }, [collectionID]);

  if (products.length === 0) return <Loader />;

  return (
    <>
      <div className={style.collection}>
        <SideMenu />
        <h2>{collectionName}</h2>
        <span>Товаров: {products.length}</span>
        <div className={style.filtersPanel}>
          <select name="sort" id="sort" className={style.selector} onChange={handleSort}>
            <option value="price/desc">по убыванию цены</option>
            <option value="price/asc">по возрастанию цены</option>
          </select>
        </div>
        <div className={style.productList}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
};
