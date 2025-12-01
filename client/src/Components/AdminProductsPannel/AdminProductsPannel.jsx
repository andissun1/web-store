import { Link } from 'react-router';
import style from './AdminProductsPannel.module.css';
import { Button } from '../Button/Button';

export const AdminProductsPannel = ({ products, handleDelete }) => {
  return (
    <div className={style.productList}>
      <Link to={'/product/create'} className={style.addProduct}>
        <span className="icon-plus" />
      </Link>
      {products.map((product) => {
        return (
          <div className={style.productItem} key={product._id}>
            <Button icon="icon-trash" onClick={() => handleDelete(product._id)} />
            <Link to={`/product/${product._id}/edit`}>
              <img src={product.image_URL} />
              <p className={style.productName}>{product.name}</p>
              <span>Количество на складе: {product.stock_quantity}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
