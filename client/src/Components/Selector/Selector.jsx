import style from './Selector.module.css';

export const Selector = ({ categories, ...props }) => {
  return (
    <select className={style.select} {...props}>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
