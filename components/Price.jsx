import { formatPrice, getPercent } from '../helpers/product';
const Price = ({ price, salePrice, regularPrice }) => {
  return (
    <div
      className={
        salePrice !== '' ? `ec__card--price has-sale` : `ec__card--price`
      }
    >
      {salePrice !== '' ? (
        <>
          <p className="price sale">
            <ins>{formatPrice(salePrice)}</ins>
          </p>
          <p className="price regular">
            <del>{formatPrice(regularPrice)}</del>
            <span className="percent">
              {`-${getPercent(regularPrice, salePrice)}`}
            </span>
          </p>
        </>
      ) : (
        <p className="price">
          <ins>{formatPrice(price)}</ins>
        </p>
      )}
    </div>
  );
};

export default Price;
