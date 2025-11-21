import style from './Selector.module.css';

export const Selector = ({ categories, ...props }) => {
  return (
    <select className={style.select} {...props}>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
