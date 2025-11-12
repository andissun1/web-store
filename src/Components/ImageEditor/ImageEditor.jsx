import style from './ImageEditor.module.css';

export const ImageEditor = ({
  ref_image_URL,
  image_URL,
  saveChanges,
  updatePhoto,
  deleteCard,
  isCreate,
}) => {
  return (
    <div className={style.editImg}>
      <img src={image_URL} />
      <label htmlFor="newImg">Ссылка на фотографию:</label>
      <input type="text" id="newImg" defaultValue={image_URL} ref={ref_image_URL} />
      <div className={style.buttonsPanel}>
        <button onClick={updatePhoto}>Обновить фото</button>
        <button onClick={saveChanges}>Сохранить карточку</button>
        {!isCreate && (
          <button onClick={deleteCard} className={style.deleteButton}>
            Удалить карточку
          </button>
        )}
      </div>
    </div>
  );
};
