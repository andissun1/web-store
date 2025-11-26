import { useSelector } from 'react-redux';
import style from './CollectionsWidget.module.css';
import { Link } from 'react-router';
import { Loader } from '../Loader/Loader';
import { useState } from 'react';
import { Button } from '../Button/Button';

export const CollectionsWidget = (props) => {
  const categories = useSelector((store) => store.categories);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const prevSlide = () => {
    categoryIndex === 0
      ? setCategoryIndex(categories.length - 1)
      : setCategoryIndex(categoryIndex - 1);
  };

  const nextSlide = () => {
    categoryIndex === categories.length - 1
      ? setCategoryIndex(0)
      : setCategoryIndex(categoryIndex + 1);
  };

  if (!categories) return <Loader />;

  return (
    <div className={style.wrapper}>
      <Button icon="icon-arrow-left" className={style.prev} onClick={prevSlide} />
      <div className={style.collections}>
        {categories.map((category, index) => {
          if (!category.img) return null;

          return (
            <div
              className={style.collectionCard}
              key={category.img}
              style={{ translate: `${-116 * categoryIndex}%` }}
            >
              <Link to={`/collection/${category._id}`}>
                <img src={category.img} />
                <span>{category.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <Button icon="icon-arrow-right" className={style.next} onClick={nextSlide} />
    </div>
  );
};
