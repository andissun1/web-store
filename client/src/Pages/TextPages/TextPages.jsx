import { Navigate, useParams } from 'react-router';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import style from './TextPages.module.css';
import { Payment } from './ContentByPageName/Payment';
import { Delivery } from './ContentByPageName/Delivery';
import { Refund } from './ContentByPageName/Refund';

const pageNamesRU = {
  payment: 'Оплата',
  delivery: 'Доставка',
  refund: 'Обмен и возврат',
};

export const TextPages = (props) => {
  const pageName = useParams().pageName;

  const getContent = () => {
    switch (pageName) {
      case 'payment':
        return <Payment />;

      case 'delivery':
        return <Delivery />;

      case 'refund':
        return <Refund />;

      default:
        return <Navigate to={'/error'} />;
    }
  };

  return (
    <div className={style.TextPages}>
      <Breadcrumbs pageName={pageNamesRU[pageName]} />
      {getContent()}
    </div>
  );
};
