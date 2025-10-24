import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import style from './product.module.css';
import { useDispatch, useSelector } from 'react-redux';

export const Product = (props) => {
  const product = useSelector((store) => store.product);
  const dispatch = useDispatch();

  if (!product.id) return <h2>Загрузка</h2>;

  return (
    <div className={style.product}>
      <SideMenu />
      {/* Ниже виджет загрушка для навигации по сайту. Главная задача перечещаться вверх по адресу ../ */}
      <nav className={style.path}>Главная / Продукт</nav>
      <div className={style.productCard}>
        <img src={product.image_URL} alt="" />
        <div className={style.productInfo}>
          <h2>{product.name}</h2>
          <p className={style.price}>{product.price} ₽</p>
          <ActionsPanel product={product} />

          <div className={style.description}>
            {/* Ниже требуется правка для указания имени категории */}
            <span>{product.category_id}</span>
            <h4>Описание</h4>
            <span>{product.description}.</span>

            {product.specifications && (
              <div className={style.specifications}>
                <h4>Характеристики</h4>
                {Object.entries(product.specifications).map(([name, value], index) => (
                  <div className={style.spec} key={index}>
                    <p>{name}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            )}

            {product.comments && (
              <div className={style.feedbacks}>
                <h4>Отзывы</h4>
                {/* Убрать потом ключи по индексу */}
                {product.comments.map((feedback, index) => (
                  <div className={style.feedback} key={index}>
                    <img src={feedback.image} />
                    <p>✯✯✯✯✯</p>
                    <p className={style.userName}>{feedback.userName}</p>
                    <h4>{feedback.title}</h4>
                    <p className={style.feedbackText}>{feedback.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
