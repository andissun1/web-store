import { useDispatch, useSelector } from 'react-redux';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { useEffect, useRef, useState } from 'react';
import { useMatch, useParams } from 'react-router';
import {
  actions as productActions,
  createProduct,
  getProduct,
  editProduct,
} from '../../Store/productReducer';
import { EditorPannel } from '../../Components/EditorPannel/EditorPannel';
import { getConfirmation } from '../../Store/modalReducer';
import { FormInput } from '../../Components/FormInput/FormInput';
import { Selector } from '../../Components/Selector/Selector';
import { Button } from '../../Components/Button/Button';
import { getCategories } from '../../Store/categoriesReducer';
import { Loader } from '../../Components/Loader/Loader';
import style from './EditProduct.module.css';

const initialState = {
  name: '',
  short_description: '',
  description: '',
  price: null,
  stock_quantity: null,
  image_URL: null,
  category: null,
  comments: null,
};

export const EditProduct = (props) => {
  const productID = useParams().id;
  const isCreate = useMatch('product/create');
  const categories = useSelector((store) => store.categories);
  const allSpecifications = useRef(null);
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (isCreate) {
      setProductInfo(initialState);
    } else {
      dispatch(getProduct(productID)).then((productFromStore) =>
        setProductInfo(productFromStore)
      );
    }

    dispatch(getCategories());

    return () => dispatch(productActions.removeProduct());
  }, []);

  const saveChanges = (event) => {
    const specifications = {};
    const nodeListOfSpecs = [...allSpecifications.current.children];
    nodeListOfSpecs.forEach((element) => {
      if (element.constructor.name === 'HTMLDivElement') {
        const newKey = element.childNodes[0].value;
        const newValue = element.childNodes[1].value;
        specifications[newKey] = newValue;
      }
    });

    const newProductInfo = {
      ...productInfo,
      specifications,
    };

    console.log(newProductInfo);
    isCreate
      ? dispatch(createProduct(newProductInfo))
      : dispatch(editProduct(productID, newProductInfo));
  };

  const addSpecification = async () => {
    const { key, value } = await dispatch(getConfirmation({ type: 'getValues' }));
    if (!key || !value) return console.log('Есть пустые поля!');
    setProductInfo({
      ...productInfo,
      specifications: { ...productInfo.specifications, [key]: value },
    });
  };

  const removeSpecification = (key) => {
    const newSpecs = { ...productInfo.specifications };
    delete newSpecs[key];

    setProductInfo({
      ...productInfo,
      specifications: { ...newSpecs },
    });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  if (!categories || !productInfo) return <Loader />;

  return (
    <div className={style.productLayout}>
      <SideMenu />
      <form className={style.productCard} onSubmit={handleSubmit}>
        <div className={style.leftColumn}>
          <img src={productInfo.image_URL} />
          <FormInput
            name="image_URL"
            type="text"
            value={productInfo.image_URL}
            onChange={handleChange}
            label="Ссылка на фотографию"
            id="newImg"
          />
          <EditorPannel
            handlers={{ saveChanges }}
            isCreate={isCreate}
            productID={productInfo._id}
          />
        </div>

        <FormInput
          name="name"
          type="text"
          value={productInfo.name}
          onChange={handleChange}
          placeholder="Название товара"
        />

        <FormInput
          name="price"
          type="number"
          value={productInfo.price}
          onChange={handleChange}
          children={<p className={style.currency}> ₽ </p>}
          placeholder="100"
        />

        <ActionsPanel product={productInfo} />
        <Selector
          name="category"
          categories={categories}
          defaultValue={productInfo.category}
          onChange={handleChange}
        />

        <FormInput
          name="short_description"
          type="text"
          value={productInfo.short_description}
          onChange={handleChange}
          placeholder="Небольшой текст (необязательно)"
        />

        <h4>Описание</h4>
        <FormInput
          name="description"
          type="text"
          value={productInfo.description}
          onChange={handleChange}
          placeholder="Более подробное описание"
        />

        <h4>В наличии:</h4>
        <FormInput
          name="stock_quantity"
          type="number"
          value={productInfo.stock_quantity}
          onChange={handleChange}
          placeholder="Количество товара на складе"
        />

        <div className={style.specifications} ref={allSpecifications}>
          <Button onClick={addSpecification} icon="icon-plus" type="button" />

          <h4>Характеристики</h4>
          {productInfo.specifications && (
            <>
              {Object.entries(productInfo.specifications).map(([name, value]) => (
                <div className={style.parameter} key={name}>
                  <input defaultValue={name} type="text" />
                  <input defaultValue={value} type="text" />
                  <Button icon="icon-trash" onClick={() => removeSpecification(name)} />
                </div>
              ))}
            </>
          )}
        </div>
      </form>
    </div>
  );
};
