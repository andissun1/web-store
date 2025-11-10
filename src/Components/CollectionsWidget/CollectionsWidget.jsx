import { useDispatch, useSelector } from 'react-redux';
import style from './CollectionsWidget.module.css';
import { useEffect } from 'react';
import { getCategories } from '../../Store/appReducer';

export const CollectionsWidget = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.app.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (!categories) return;

  return (
    <div className={style.collections}>
      {categories.map((category) => {
        if (!category.img) return null;

        return (
          <div className={style.collectionCard} key={category.img}>
            <img src={category.img} />
            <span>{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};
