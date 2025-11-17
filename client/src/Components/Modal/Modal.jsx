import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { useState } from 'react';

const initialState = { key: '', value: '' };

export const Modal = () => {
  // Все данные для отображения получаем {} и рисуем HTML
  const modalParams = useSelector((store) => store.modal);
  const [values, setValues] = useState(initialState);

  const closeModal = () => modalParams.onClose();
  const confirm = () => {
    modalParams.onConfirm(values);
    setValues(initialState);
  };

  if (!modalParams) return;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  // Вариант модалки для подтвержения действия
  let modalLayoyt = (
    <div className={style.modalWindow} onClick={() => modalParams.onClose()}>
      <div className={style.modalContent} style={{ justifyItems: 'center' }}>
        <h2>{modalParams.title}</h2>

        <button className={style.redButton} onClick={() => modalParams.onConfirm()}>
          Подтвердить
        </button>
        <button className={style.defaultButton} onClick={() => modalParams.onClose()}>
          Отменить
        </button>
        <button datatype="close" onClick={() => modalParams.onClose()}>
          <span className="icon-times" />
        </button>
      </div>
    </div>
  );

  // Вариант модалки для возврата каких-либо значений
  if (modalParams.type === 'getValues') {
    modalLayoyt = modalParams && (
      <div className={style.modalWindow} onClick={() => closeModal()}>
        <div className={style.modalContent} onClick={(event) => event.stopPropagation()}>
          <label htmlFor="key">Название категории:</label>
          <input
            id="key"
            type="text"
            name="key"
            value={values.key}
            onChange={handleChange}
          />

          <label htmlFor="value">Значение:</label>
          <input
            id="value"
            type="text"
            name="value"
            value={values.value}
            onChange={handleChange}
          />

          <button className={style.defaultButton} onClick={confirm}>
            Сохранить
          </button>
          <button datatype="close" onClick={() => closeModal()}>
            <span className="icon-times" />
          </button>
        </div>
      </div>
    );
  }

  return createPortal(modalLayoyt, document.getElementById('modal'));
};
