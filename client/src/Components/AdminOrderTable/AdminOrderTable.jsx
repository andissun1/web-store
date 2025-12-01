import { Link } from 'react-router';
import style from './AdminOrderTable.module.css';

export const AdminOrderTable = ({ orders }) => {
  const countProducts = (order) =>
    order.products.reduce((acc, product) => (acc += product.count), 0);

  return (
    <table className={style.AdminOrderTable}>
      <thead className={style.header}>
        <tr>
          <th>Номер</th>
          <th>Кол-во товаров</th>
          <th>Статус</th>
          <th className={style.lastColumn}>Дата</th>
        </tr>
      </thead>
      <tbody className={style.body}>
        {orders.map((order) => {
          return (
            <tr key={order._id}>
              <td>
                <Link to={`/order/${order._id}`}>{order.numOfOrder} </Link>
              </td>

              <td>{countProducts(order)}</td>
              <td>{order.status}</td>
              <td>
                {new Date(order.createdAt).toLocaleString().replace(',', '').slice(0, -3)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
