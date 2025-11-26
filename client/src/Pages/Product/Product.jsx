import { useEffect } from 'react';
import { ActionsPanel } from '../../Components/ActionsPanel/ActionsPanel';
import { SideMenu } from '../../Components/SideMenu/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { actions as productActions, getProduct } from '../../Store/productReducer';
import { Link, useLocation, useParams } from 'react-router';
import { Comments } from '../../Components/Comments/Comments';
import { DescriptionBlock } from '../../Components/DescriptionBlock/DescriptionBlock';
import style from './product.module.css';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../Components/Loader/Loader';

export const Product = () => {
  const address = useLocation().pathname;
  const product = useSelector((store) => store.product);
  const isAdmin = useSelector((store) => store.user.roleName) === 'admin';
  const dispatch = useDispatch();
  const productID = useParams().id;

  useEffect(() => {
    dispatch(getProduct(productID));

    return () => dispatch(productActions.removeProduct());
  }, [productID]);

  if (!product) return <Loader />;

  return (
    <div className={style.productLayout}>
      <SideMenu />
      <Breadcrumbs collectionID={product.category} pageName={product.name} />
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
