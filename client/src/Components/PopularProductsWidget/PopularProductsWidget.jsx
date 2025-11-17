import { Link } from 'react-router';
import style from './PopularProductsWidget.module.css';

export const PopularProductsWidget = ({ products }) => {
  if (products.length === 0) return;

  return (
    <div className={style.widget_popular}>
      <h3>Популярное</h3>
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <div className={style.product}>
            <img src={product.image_URL} />
            <p>{product.name}</p>
            <strong> {product.price} р </strong>
          </div>
        </Link>
      ))}
    </div>
  );
};
