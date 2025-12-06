import { Link } from 'react-router';
import style from './Banners.module.css';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';

export const Banners = () => {
  const categories = useSelector((store) => store.categories.categories);
  const isLoading = useSelector((store) => store.categories.isLoadingCategories);
  if (isLoading) return <Loader />;

  const bannersInfo = [
    {
      img: `https://static.insales-cdn.com/r/v0VWZmTtzFI/rs:fill-down:688:327:1/q:100/plain/files/1/2765/24275661/original/6722__1_.jpg@jpg`,
      _id: categories.find((category) => category.name === 'Для новорождённых')._id,
    },
    {
      img: `https://static.insales-cdn.com/r/2f7AaPdAuug/rs:fill-down:688:327:1/q:100/plain/files/1/2824/24275720/original/6721__1_.jpg@jpg`,
      _id: categories.find((category) => category.name === 'Настольные игры')._id,
    },
  ];

  return (
    <div className={style.banners}>
      {bannersInfo.map((banner) => (
        <Link to={`collection/${banner._id}`} key={banner._id}>
          <img src={banner.img} />
        </Link>
      ))}
    </div>
  );
};
