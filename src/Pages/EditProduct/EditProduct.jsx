import { useDispatch, useSelector } from 'react-redux';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { useEffect, useRef, useState } from 'react';
import { matchPath, useMatch, useParams } from 'react-router';
import { createProduct, getProduct } from '../../Store/productReducer';
import style from './EditProduct.module.css';

const categories = ['Выпечка', 'Самовары', 'Техника', 'Без категории'];

const initialState = {
  name: 'Название',
  description: 'Более подробное описание',
  price: 10,
  stock_quantity: 10,
  image_URL: null,
  category_id: null,
  comments: null,
};

export const EditProduct = (props) => {
  const isCreate = useMatch('product/create');
  const productID = useParams().id;
  const productFromStore = useSelector((store) => store.product);
  const [product, setProduct] = useState(isCreate ? initialState : productFromStore);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const name = useRef(null);
  const price = useRef(null);
  const image_URL = useRef(null);
  const category_id = useRef(null);
  const description = useRef(null);
  const allSpecifications = useRef(null);
  const specificationsKey = useRef(null);
  const specificationsValue = useRef(null);
  const stock_quantity = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(productID));
  }, []);

  const updatePhoto = () => {
    setProduct({ ...product, image_URL: image_URL.current.value });
  };

  const addSpecification = () => {
    const key = specificationsKey.current.value;
    const value = specificationsKey.current.value;
    if (!key || !value) return console.log('Есть пустые поля!');

    setProduct({
      ...product,
      specifications: { ...product.specifications, [key]: value },
    });

    setIsOpenModal(false);
  };

  const saveChanges = (event) => {
    const specifications = {};
    const nodeListOfSpecs = [...allSpecifications.current.children];
    nodeListOfSpecs.forEach((element) => {
      if (element.constructor.name === 'HTMLDivElement') {
        const newKey = element.childNodes[0].textContent;
        const newValue = element.childNodes[1].textContent;
        specifications[newKey] = newValue;
      }
      return;
    });

    const newProductInfo = {
      ...productFromStore,
      name: name.current.textContent,
      price: Number(price.current.textContent.match(/\d+/)[0]),
      image_URL: image_URL.current.value,
      category_id: category_id.current.value,
      description: description.current.textContent,
      stock_quantity: stock_quantity.current.value,
      specifications,
    };

    console.log(newProductInfo);

    if (isCreate) {
      dispatch(createProduct(newProductInfo));
    }
  };

  return (
    <div className={style.product}>
      <SideMenu />
      <nav className={style.path}>Главная / Продукт</nav>
      <div className={style.productCard}>
        <div className={style.editImg}>
          <img src={product.image_URL} />
          <label htmlFor="newImg">Ссылка на фотографию:</label>
          <input
            type="text"
            id="newImg"
            defaultValue={product.image_URL}
            ref={image_URL}
          />
          <div className={style.buttonsPanel}>
            <button onClick={updatePhoto}>Обновить фото</button>
            <button onClick={saveChanges}>Сохранить карточку</button>
          </div>
        </div>
        <div className={style.productInfo}>
          <h2 contentEditable={true} suppressContentEditableWarning ref={name}>
            {product.name}
          </h2>
          <p
            className={style.price}
            contentEditable={true}
            suppressContentEditableWarning
            ref={price}
          >
            {product.price} ₽
          </p>
          <ActionsPanel product={product} />

          <div className={style.description}>
            <select defaultValue={product.category_id} ref={category_id}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <h4>Описание</h4>
            <span contentEditable={true} suppressContentEditableWarning ref={description}>
              {product.description}.
            </span>

            <div className={style.specifications} ref={allSpecifications}>
              <button onClick={() => setIsOpenModal(true)}>
                <span className="icon-plus" />
              </button>

              {isOpenModal && (
                <div className={style.modalWindow}>
                  <div className={style.modalContent}>
                    <label htmlFor="key">Название категории:</label>
                    <input id="key" type="text" ref={specificationsKey} />
                    <label htmlFor="value">Значение:</label>
                    <input id="value" type="text" ref={specificationsValue} />
                    <button datatype="save" onClick={addSpecification}>
                      Сохранить
                    </button>
                    <button datatype="close" onClick={() => setIsOpenModal(false)}>
                      <span className="icon-times"></span>
                    </button>
                  </div>
                </div>
              )}

              <h4>Характеристики</h4>
              {product.specifications && (
                <>
                  {Object.entries(product.specifications).map(([name, value], index) => (
                    <div
                      className={style.spec}
                      key={index}
                      contentEditable={true}
                      suppressContentEditableWarning
                    >
                      <p>{name}</p>
                      <p>{value}</p>
                      <button
                        className="icon-trash"
                        onClick={(event) => event.target.parentNode.remove()}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className={style.stock_quantity}>
              <h4>В наличии:</h4>
              <input
                type="number"
                defaultValue={product.stock_quantity}
                ref={stock_quantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
