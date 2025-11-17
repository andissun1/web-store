import style from './DescriptionBlock.module.css';

export const DescriptionBlock = ({ product }) => {
  return (
    <div className={style.description}>
      {product.short_description && (
        <span className={style.short_description}>{product.short_description}</span>
      )}
      {product.description && (
        <>
          <h4>Описание</h4>
          <span>{product.description}.</span>
        </>
      )}

      {product.specifications && (
        <div className={style.specifications}>
          <h4>Характеристики</h4>
          {Object.entries(product.specifications).map(([name, value], index) => (
            <div className={style.spec} key={index}>
              <p>{name}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
