import { useEffect } from 'react';
import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Store/productReducer';
import { useParams } from 'react-router';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Comments } from '../../Components/Comments/Comments';
import { DescriptionBlock } from '../../Components/DescriptionBlock/DescriptionBlock';
import style from './product.module.css';

export const Product = () => {
  const product = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const productID = useParams().id;

  useEffect(() => {
    dispatch(getProduct(productID));
  }, [productID]);

  if (!product) return <h2>Загрузка</h2>;

  return (
    <div className={style.productLayout}>
      <SideMenu />
      <Breadcrumbs />
      <div className={style.productCard}>
        <img src={product.image_URL} />
        <h2>{product.name}</h2>
        <p className={style.price}>{product.price} ₽</p>
        <ActionsPanel product={product} />
        <DescriptionBlock product={product} />
        <Comments comments={product.comments} />
      </div>
    </div>
  );
};
