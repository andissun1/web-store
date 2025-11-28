import { Button } from '../../Button/Button';
import style from './AddSpecification.module.css';
import { useState } from 'react';

const initialState = { key: '', value: '' };

export const AddSpecification = ({ modalParams }) => {
  const [values, setValues] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  const closeModal = () => modalParams.onClose();
  const confirm = () => {
    modalParams.onConfirm(values);
    setValues(initialState);
  };

  return (
    <div className={style.AddSpecification}>
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
          <Button icon="icon-times" datatype="close" onClick={() => closeModal()} />
        </div>
      </div>
    </div>
  );
};
