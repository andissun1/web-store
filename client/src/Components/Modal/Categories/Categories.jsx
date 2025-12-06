import { useSelector } from 'react-redux';
import style from './Categories.module.css';
import { Loader } from '../../Loader/Loader';
import { Link } from 'react-router';

export const Categories = ({ modalParams }) => {
  const categories = useSelector((store) => store.categories.categories);
  const isLoading = useSelector((store) => store.categories.isLoadingCategories);

  if (isLoading) return <Loader />;

  return (
    <div className={style.modalWindow} onClick={() => modalParams.onClose()}>
      <div className={style.modalContent}>
        {categories.map((category) => {
          if (!category.img) return null;

          return (
            <div className={style.collectionCard} key={category.img}>
              <Link to={`/collection/${category._id}`} className={style.category}>
                <img src={category.img} />
                <span>{category.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
