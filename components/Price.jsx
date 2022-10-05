import { useMemo } from 'react';
import { formatPrice, getPercent } from '../helpers/product';
const Price = ({ price, salePrice, regularPrice, asSingle }) => {
  const classNames = useMemo(() => {
    let classes = 'ec__card--price';

    if (salePrice !== '') {
      classes = classes.concat(' ', 'has-sale');
    }

    if (asSingle !== undefined) {
      classes = classes.concat(' ', 'single');
    }

    return classes;
  }, [asSingle, regularPrice, salePrice, price]);
  return (
    <div className={classNames}>
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
