import * as Icon from 'react-feather';
import RateStars from '../../../../components/RateStars';
import NoRating from '../NoRating';
const ReviewSummary = ({
  averageRate,
  ratingCount,
  ratingResults,
  onShowForm
}) => {
  const RatingResult = ({ averageRate, ratingCount, ratingResults }) => {
    return (
      <div className="review-result">
        <div className="average">
          <div className="average-number">{averageRate}</div>
          <div className="average-star">
            <div className="count">{`${ratingCount} đánh giá`} </div>
          </div>
        </div>
        <div className="bars">
          {ratingResults.map((rate, index) => {
            return (
              <div key={index} className="bar">
                <span className="bar-stars">
                  <RateStars
                    asRevert
                    maxRating={5}
                    rate={rate.score}
                    size={14}
                  />
                </span>
                <span className="bar-line">
                  <span
                    className="point"
                    style={{ width: `${rate.average * 100}%` }}
                  ></span>
                </span>
                <span className="bar-count">{rate.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="review-summary">
      {(ratingCount > 0 && (
        <RatingResult
          averageRate={averageRate}
          ratingCount={ratingCount}
          ratingResults={ratingResults}
        />
      )) || <NoRating />}
      <span
        className="button button-review"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        onClick={onShowForm}
      >
        <Icon.Star size={16} />
        Viết đánh giá
      </span>
    </div>
  );
};
export default ReviewSummary;
