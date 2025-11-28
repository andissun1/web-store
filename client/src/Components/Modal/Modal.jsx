import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { Confirmation } from './Confirmation/Confirmation';
import { AddSpecification } from './AddSpecification/AddSpecification';
import { Categories } from './Categories/Categories';
import { OneClickOrder } from './OneClickOrder/OneClickOrder';

export const Modal = () => {
  // Все данные для отображения получаем {} и рисуем HTML
  const modalParams = useSelector((store) => store.modal);

  if (!modalParams) return;

  let modalLayoyt = null;

  switch (modalParams.type) {
    case 'AddSpecification':
      modalLayoyt = <AddSpecification modalParams={modalParams} />;
      break;

    case 'getCategory':
      modalLayoyt = <Categories modalParams={modalParams} />;
      break;

    case 'OneClickOrder':
      modalLayoyt = <OneClickOrder modalParams={modalParams} />;
      break;

    default:
      modalLayoyt = <Confirmation modalParams={modalParams} />;
      break;
  }

  return createPortal(modalLayoyt, document.getElementById('modal'));
};
