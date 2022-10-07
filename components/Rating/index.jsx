import { useMemo } from 'react';
const Rating = ({ average, rating, isAllow, starIcon }) => {
  if (isAllow) {
  }

  const averageNumber = useMemo(() => Number(average).toFixed(1), [average]);
  return (
    <div className="ec__product--rate">
      <span className="ec__product--average">
        {starIcon && starIcon()}
        <span className="arerage-number">{averageNumber}</span>
      </span>
      {rating !== undefined && (
        <>
          <span className="space">|</span>
          <span className="ec__product--rating">
            <a href="">{rating} Đánh giá</a>
          </span>
        </>
      )}
    </div>
  );
};
export default Rating;
