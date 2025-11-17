import style from './Comments.module.css';

export const Comments = ({ comments }) =>
  comments ? (
    <div className={style.feedbacks}>
      <h4>Отзывы</h4>
      {comments.map((feedback) => (
        <div className={style.feedback} key={feedback}>
          <img src={feedback.image} />
          <p>✯✯✯✯✯</p>
          <p className={style.userName}>{feedback.userName}</p>
          <h4>{feedback.title}</h4>
          <p className={style.feedbackText}>{feedback.value}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className={style.feedBlock}>
      <h4>Отзывы</h4>
      <span>Отзывов ещё никто не оставлял</span>
      <button className={style.openFeedback}>Написать отзыв</button>
    </div>
  );
