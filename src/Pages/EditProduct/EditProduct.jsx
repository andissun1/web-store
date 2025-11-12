import { useDispatch, useSelector } from 'react-redux';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { useEffect, useRef, useState } from 'react';
import { useMatch, useParams } from 'react-router';
import { createProduct, deleteProduct, getProduct } from '../../Store/productReducer';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { ImageEditor } from '../../Components/ImageEditor/ImageEditor';
import { Selector } from '../../Components/Selector/Selector';
import { Button } from '../../Components/Button/Button';
import style from './EditProduct.module.css';
import { getConfirmation } from '../../Store/modalReducer';

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
  const name = useRef(null);
  const price = useRef(null);
  const image_URL = useRef(null);
  const category_id = useRef(null);
  const description = useRef(null);
  const allSpecifications = useRef(null);
  const stock_quantity = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(productID));
  }, []);

  const addSpecification = (key, value) => {
    if (!key || !value) return console.log('Есть пустые поля!');

    setProduct({
      ...product,
      specifications: { ...product.specifications, [key]: value },
    });
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

    if (isCreate) {
      dispatch(createProduct(newProductInfo));
    } else {
      // Написать функционал по редактированию товара
      // dispatch(editProduct(productID, newProductInfo));
    }
  };

  const updatePhoto = () => {
    setProduct({ ...product, image_URL: image_URL.current.value });
  };

  const addNewSpec = async () => {
    const { key, value } = await dispatch(getConfirmation({ type: 'getValues' }));
    addSpecification(key, value);
  };

  const deleteCard = async () => {
    const confirm = await dispatch(
      getConfirmation({
        title: 'Вы уверены что хотите удалить товар?',
      })
    );

    if (confirm) dispatch(deleteProduct(productID));
    if (!confirm) console.log('Отмена');
  };

  return (
    <div className={style.productLayout}>
      <SideMenu />
      <Breadcrumbs />
      <div className={style.productCard}>
        <ImageEditor
          ref_image_URL={image_URL}
          image_URL={product.image_URL}
          saveChanges={saveChanges}
          updatePhoto={updatePhoto}
          deleteCard={deleteCard}
          isCreate={isCreate}
        />
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
          <Selector product={product} categories={categories} category_id={category_id} />

          <h4>Описание</h4>
          <span contentEditable={true} suppressContentEditableWarning ref={description}>
            {product.description}.
          </span>

          <div className={style.specifications} ref={allSpecifications}>
            <Button onClick={addNewSpec} icon="icon-plus" />

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
  );
};
