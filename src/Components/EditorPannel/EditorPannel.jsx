import { useDispatch } from 'react-redux';
import style from './EditorPannel.module.css';
import { getConfirmation } from '../../Store/modalReducer';
import { deleteProduct } from '../../Store/productReducer';

export const EditorPannel = ({ handlers, isCreate }) => {
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

  return (
    <div className={style.buttonsPanel} id="editorPannel">
      <button onClick={saveChanges}>Сохранить карточку</button>
      {!isCreate && (
        <button onClick={deleteCard} className={style.deleteButton}>
          Удалить карточку
        </button>
      )}
    </div>
  );
};
