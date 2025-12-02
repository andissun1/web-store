import { useDispatch } from 'react-redux';
import style from './EditorPannel.module.css';
import { getConfirmation } from '../../Store/modalReducer';
import { deleteProduct } from '../../Store/productReducer';

export const EditorPannel = ({ handlers, isCreate, productID, productInfo }) => {
  const dispatch = useDispatch();
  const { saveChanges } = handlers;

  const deleteCard = async () => {
    const confirm = await dispatch(
      getConfirmation({
        title: 'Вы уверены что хотите удалить товар?',
      })
    );

    if (confirm) dispatch(deleteProduct(productID));
  };

  const isValid = productInfo.price && productInfo.category && productInfo.name;

  return (
    <div className={style.buttonsPanel} id="editorPannel">
      <button onClick={saveChanges} disabled={!isValid}>
        Сохранить карточку
      </button>
      {!isCreate && (
        <button onClick={deleteCard} className={style.deleteButton}>
          Удалить карточку
        </button>
      )}
    </div>
  );
};
