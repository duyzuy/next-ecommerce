import { useMemo } from 'react';
import Image from 'next/image';
import CustomImage from '../CustomImage';
import { formatPrice, getPercent } from '../../helpers/product';
import * as Icon from 'react-feather';
const Card = (props) => {
  const { type, data } = props;
  const { images } = data;
  // console.log(data);

  const thumbnailUrl = useMemo(() => {
    if (images.length > 0) {
      return images[0].src;
    }
  }, []);

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
  const Rating = ({ averageRating, ratingCount }) => {
    return (
      <>
        {ratingCount !== 0 && (
          <>
            {averageRating}
            <Icon.Star size={14} />
          </>
        )}
      </>
    );
  };
  return (
    <div className={`ec__card ${type}`}>
      <div className="ec__card--inner">
        <div className="ec__card--image">
          <div className="image">
            <CustomImage src={thumbnailUrl} alt={data.name} />
          </div>
        </div>
        <div className="ec__card--bottom">
          <h3 className="ec__card--title">{data.name}</h3>

          <Price
            price={data.price}
            regularPrice={data.regular_price}
            salePrice={data.sale_price}
          />
          <Rating
            averageRating={data.average_rating}
            ratingCount={data.rating_count}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
