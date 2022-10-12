import * as Icon from 'react-feather';
const ReviewSummary = ({ averageRate, ratingCount, ratingResults }) => {
  return (
    <>
      <div className="review-result">
        <div className="starts">
          <div className="average">{averageRate}</div>
          <div className="right">
            <div className="star-icon">
              <Icon.Star
                size={40}
                style={{
                  fill: '#F4BE2C',
                  color: '#F4BE2C'
                }}
              />
            </div>

            <div className="count">{`${ratingCount} đánh giá`} </div>
          </div>
        </div>
        <div className="bars">
          {ratingResults.map((rate, index) => {
            return (
              <div key={index} className="bar">
                <span className="bar-score">
                  <span className="icon">
                    <Icon.Star
                      size={14}
                      style={{
                        fill: '#fff',
                        color: '#F4BE2C'
                      }}
                    />
                  </span>
                  <span className="number">&#8194;{rate.score}</span>
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
        <span
          className="button button-review"
          style={{ maxWidth: 160, marginRight: 'inherit' }}
        >
          <Icon.PenTool size={16} />
          Viết đánh giá
        </span>
      </div>
    </>
  );
};
export default ReviewSummary;
