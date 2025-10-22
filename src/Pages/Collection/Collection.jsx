import { useSelector } from 'react-redux';
import style from './collection.module.css';
import { ProductCard } from '../../Components/ProductCard/ProductCard';

export const Collection = (props) => {
  const products = useSelector((store) => store.app.allProducts);

  return (
    <div className={style.collection}>
      <h2>Подборка товаров по категории (все)</h2>
      <div className={style.productList}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
