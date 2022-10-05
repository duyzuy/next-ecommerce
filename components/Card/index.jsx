import { useMemo, useState } from 'react';

import CustomImage from '../CustomImage';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Price from '../Price';
const Card = (props) => {
  const { type, isLoading, data, query } = props;

  const { images } = data;
  const router = useRouter();

  const thumbnailUrl = useMemo(() => {
    if (images.length > 0) {
      return images[0].src;
    }
  }, [images]);

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
  const goToPage = (slug) => {
    router.push({
      pathname: `/product/${slug}`,
      query: query
    });
  };
  return (
    <>
      {isLoading === true ? (
        <>
          <div className={`ec__card ${type}`}>
            <SkeletonTheme baseColor="#e9f5ff" highlightColor="#fbfdff">
              <Skeleton height={150} style={{ marginBottom: `15px` }} />
              <Skeleton count={3} height={20} style={{ marginBottom: `5px` }} />
              <Skeleton
                count={1}
                height={20}
                style={{ marginBottom: `5px`, width: '60%' }}
              />
            </SkeletonTheme>
          </div>
        </>
      ) : (
        <div className={`ec__card ${type}`} onClick={() => goToPage(data.slug)}>
          <div className="ec__card--inner">
            <div className="ec__card--image">
              <CustomImage
                src={thumbnailUrl}
                alt={data.name}
                width={500}
                height={500}
              />
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
      )}
    </>
  );
};

export default Card;
