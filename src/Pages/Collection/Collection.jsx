import { useDispatch, useSelector } from 'react-redux';
import style from './collection.module.css';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getCategory, sortCollection } from '../../Store/appReducer';
import { SideMenu } from '../../Components/SideMenu/SideMenu';

export const Collection = (props) => {
  const products = useSelector((store) => store.app.allProducts);
  const categories = useSelector((store) => store.app.categories);
  const collectionID = useParams().id;
  const dispatch = useDispatch();

  const collectionName = categories?.find((item) => item.id === collectionID).name;

  const handleSort = ({ target }) => {
    dispatch(sortCollection(collectionID, target.value));
  };

  useEffect(() => {
    dispatch(getCategory(collectionID));
  }, [collectionID]);

  return (
    <>
      <div className={style.collection}>
        <SideMenu />
        <h2>{collectionName}</h2>
        <span>Товаров {products.length}</span>
        <div className={style.filtersPanel}>
          <select name="sort" id="sort" className={style.selector} onChange={handleSort}>
            <option value="price/desc">по убыванию цены</option>
            <option value="price/asc">по возрастанию цены</option>
          </select>
        </div>
        <div className={style.productList}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};
