import { useEffect } from 'react';
import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { actions as productActions, getProduct } from '../../Store/productReducer';
import { Link, useLocation, useParams } from 'react-router';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Comments } from '../../Components/Comments/Comments';
import { DescriptionBlock } from '../../Components/DescriptionBlock/DescriptionBlock';
import style from './product.module.css';
import { ROLES } from '../../BFF/bff';

export const Product = () => {
  const address = useLocation().pathname;
  const product = useSelector((store) => store.product);
  const isAdmin = useSelector((store) => store.user.role_id) === ROLES.admin;
  const dispatch = useDispatch();
  const productID = useParams().id;

  useEffect(() => {
    dispatch(getProduct(productID));

    return () => dispatch(productActions.removeProduct());
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
      {isAdmin && (
        <Link to={address + '/edit'} className={style.editLink}>
          <button children="Редактировать товар" />
        </Link>
      )}
    </div>
  );
};
