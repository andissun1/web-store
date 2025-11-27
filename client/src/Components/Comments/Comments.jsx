import { useState } from 'react';
import { Button } from '../Button/Button';
import style from './Comments.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, removeComment, updateComment } from '../../Store/productReducer';

export const Comments = ({ productID, comments: commentsFromServer }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState(commentsFromServer);

  const sendComment = async () => {
    const newComment = await dispatch(addComment(productID, { text }));
    setComments([...comments, newComment]);
    setIsOpenInput(false);
  };

  const handleRemove = async (commentID) => {
    await dispatch(removeComment(commentID, productID));
    setComments(comments.filter((comment) => comment._id !== commentID));
    setIsOpenInput(false);
  };

  const openInput = async (commentID, text) => {
    setIsOpenInput(true);
    setIsEdit(commentID);
    setText(text);
  };

  const handleEdit = async () => {
    const newComment = await dispatch(updateComment(isEdit, { text }));
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
            onClick={isEdit ? handleEdit : sendComment}
          />
        </>
      )}

      {user._id && (
        <button
          onClick={() => setIsOpenInput((prev) => !prev)}
          className={style.openFeedback}
        >
          {isOpenInput ? 'Скрыть поле ввода' : 'Написать отзыв'}
        </button>
      )}

      {comments.length > 0
        ? comments.map((feedback) => (
            <div className={style.feedback} key={feedback._id}>
              <p className={style.userName}>{feedback.author.fullname}</p>
              <p className={style.date}>
                Дата отзыва: {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
              <p className={style.feedbackText}>{feedback.text}</p>
              <Button
                onClick={() => handleRemove(feedback._id)}
                className={style.removeButton}
                icon="icon-trash"
              />
              <Button
                onClick={() => openInput(feedback._id, feedback.text)}
                className={style.editButton}
                icon="icon-pencil"
              />
            </div>
          ))
        : 'Отзывов пока никто не оставлял. Готовы быть первыми?'}
    </div>
  );
};
