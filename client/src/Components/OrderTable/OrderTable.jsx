import { DELIVERY_COST } from '../../Pages/NewOrder/NewOrder';
import style from './OrderTable.module.css';

export const OrderTable = ({ order }) => (
  <table className={style.OrderTable}>
    <thead className={style.header}>
      <tr>
        <th>Наименование</th>
        <th>Кол-во</th>
        <th className={style.priceColumn}>Стоимость</th>
      </tr>
    </thead>
    <tbody className={style.body}>
      {order.products.map((product) => {
        return (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.count}</td>
            <td>{product.price} ₽</td>
          </tr>
        );
      })}
      <tr>
        <td colSpan={2}>Доставка</td>
        <td>{order.deliveryCost} ₽</td>
      </tr>
    </tbody>
    <tfoot className={style.footer}>
      <tr>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          {`Итого: `}
          <strong>
            {order.products
              .reduce(
                (acc, product) => (acc += product.price * product.count),
                DELIVERY_COST
              )
              .toLocaleString('ru-RU')}{' '}
            ₽
          </strong>
        </td>
      </tr>
    </tfoot>
  </table>
);
