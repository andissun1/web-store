import style from './Selector.module.css';

export const Selector = ({ product, category_id, categories }) => {
  return (
    <select defaultValue={product.category_id} ref={category_id} className={style.select}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};
