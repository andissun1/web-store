import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import style from './product.module.css';

const testProduct = {
  id: 'product_id',
  name: 'Самовар "Клубничка"',
  description: 'Крутой самовар на 10 литров',
  price: 1500,
  stock_quantity: 5,
  image_URL:
    'https://avatars.mds.yandex.net/get-marketpic/5099679/picf419211e197c2f50762417f91e28b8b8/orig',
  category_id: '-ewr23r23f32f-',
  comments: {
    comment_id_0: {
      stars: 5,
      title: 'Всё супер!',
      description: 'Очень вкусный пончик. Взял 10 штук себе и друзьям!',
      user_id: '-wewewfdrgh345345-',
      created_at: 342352324625,
    },
    comment_id_1: {
      stars: 5,
      title: 'Всё супер!',
      description: 'Очень вкусный пончик. Взял уже 100 штук себе и друзьям!',
      user_id: '-wewewfdrgh345345-',
      created_at: 342352324625,
    },
  },
};

const testSpecs = [
  { title: 'Страна-производитель', value: 'Россия' },
  { title: 'Высота предмета', value: '30' },
  { title: 'Высота предмета', value: '30' },
  { title: 'Высота предмета', value: '30' },
  { title: 'Высота предмета', value: '30' },
  { title: 'Высота предмета', value: '30' },
  { title: 'Высота предмета', value: '30' },
];

const testFeedbacks = [
  {
    title: 'Всё супер!',
    value:
      'Очень вкусный пончик. Взял уже 100 штук себе и друзьям! Очень вкусный пончик. Взял уже 100 штук себе и друзьям! Очень вкусный пончик. Взял уже 100 штук себе и друзьям! Очень вкусный пончик. Взял уже 100 штук себе и друзьям!',
    image: 'https://imgholder.ru/100x100/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson',
    userName: 'Пучо Хэндзавич Ооочень длинное имя',
  },
  {
    title: 'Всё супер!',
    value: 'Очень вкусный пончик. Взял уже 100 штук себе и друзьям!',
    image: 'https://imgholder.ru/100x100/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson',
    userName: 'Пучо Хэндзавич',
  },
  {
    title: 'Всё супер!',
    value: 'Очень вкусный пончик. Взял уже 100 штук себе и друзьям!',
    image: 'https://imgholder.ru/100x100/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson',
    userName: 'Пучо Хэндзавич',
  },
  {
    title: 'Всё супер!',
    value: 'Очень вкусный пончик. Взял уже 100 штук себе и друзьям!',
    image: 'https://imgholder.ru/100x100/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson',
    userName: 'Пучо Хэндзавич',
  },
];

export const Product = (props) => {
  return (
    <div className={style.product}>
      <SideMenu />
      <nav className={style.path}>Главная / Продукт</nav>
      <div className={style.productCard}>
        <img src={testProduct.image_URL} alt="" />
        <div className={style.productInfo}>
          <h2>{testProduct.name}</h2>
          <p className={style.price}>{testProduct.price} ₽</p>
          <ActionsPanel />

          <div className={style.description}>
            <span>{testProduct.description}</span>
            <h4>Описание</h4>
            <span>
              {testProduct.description}. Этот блок для более подробного описания товара.
            </span>

            <div className={style.specifications}>
              <h4>Характеристики</h4>
              {testSpecs.map((spec) => (
                <div className={style.spec}>
                  <p>{spec.title}</p>
                  <p>{spec.value}</p>
                </div>
              ))}
            </div>

            <div className={style.feedbacks}>
              <h4>Отзывы</h4>
              {testFeedbacks.map((feedback) => (
                <div className={style.feedback}>
                  <img src={feedback.image} />
                  <p>✯✯✯✯✯</p>
                  <p className={style.userName}>{feedback.userName}</p>
                  <h4>{feedback.title}</h4>
                  <p className={style.feedbackText}>{feedback.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
