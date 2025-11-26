import style from './Confirmation.module.css';

export const Confirmation = ({ modalParams }) => {
  return (
    <div className={style.Confirmation}>
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
    </div>
  );
};
