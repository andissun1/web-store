import { useState } from 'react';
import { Button } from '../Button/Button';
import style from './Comments.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, removeComment, updateComment } from '../../Store/productReducer';
import { getConfirmation } from '../../Store/modalReducer';

export const Comments = ({ productID, comments: commentsFromServer }) => {
  const [comments, setComments] = useState(commentsFromServer);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [commentID, setСommentID] = useState(null);
  const [text, setText] = useState(''); // Данные из инпутов для отправки на сервер (пока только текст)
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const sendComment = async () => {
    const newComment = await dispatch(addComment(productID, { text }));
    setComments([...comments, newComment]);
    setIsOpenInput(false);
  };

  const handleRemove = async (commentID) => {
    const confirmation = await dispatch(
      getConfirmation({ title: 'Удалить комментарий?' })
    );
    if (!confirmation) return;
    await dispatch(removeComment(commentID, productID));
    setComments(comments.filter((comment) => comment._id !== commentID));
    setIsOpenInput(false);
  };

  const openInput = async (commentID, text) => {
    setIsOpenInput(true);
    setСommentID(commentID);
    setText(text);
  };

  const handleEdit = async () => {
    const newComment = await dispatch(updateComment(commentID, { text }));
    const newCommentsArray = comments.map((comment) =>
      comment._id === newComment._id ? newComment : comment
    );
    setComments(newCommentsArray);
    setIsOpenInput(false);
  };

  return (
    <div className={style.feedbacks}>
      <h4>Отзывы</h4>

      {isOpenInput && (
        <>
          <textarea
            value={text}
            className={style.textarea}
            placeholder="Ваша оценка и мнение о товаре"
            onChange={({ target }) => setText(target.value)}
          />
          <Button
            icon="icon-paper-plane"
            children={'Отправить'}
            className={style.saveComment}
            onClick={commentID ? handleEdit : sendComment}
          />
        </>
      )}

      {user?._id && (
        <button
          onClick={() => setIsOpenInput((prev) => !prev)}
          className={style.openFeedback}
        >
          {isOpenInput ? 'Скрыть поле ввода' : 'Написать отзыв'}
        </button>
      )}

      {comments?.length > 0
        ? comments.map((feedback) => (
            <div className={style.feedback} key={feedback._id}>
              <p className={style.userName}>{feedback.author.fullname}</p>
              <p className={style.date}>
                Дата отзыва: {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
              <p className={style.feedbackText}>{feedback.text}</p>

              {(user._id === feedback.author._id || user.roleName === 'admin') && (
                <Button
                  onClick={() => handleRemove(feedback._id)}
                  className={style.removeButton}
                  icon="icon-trash"
                />
              )}

              {user._id === feedback.author._id && (
                <Button
                  onClick={() => openInput(feedback._id, feedback.text)}
                  className={style.editButton}
                  icon="icon-pencil"
                />
              )}
            </div>
          ))
        : 'Отзывов пока никто не оставлял. Готовы быть первыми?'}
    </div>
  );
};
