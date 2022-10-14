import { useMemo } from 'react';
import { Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import CommentList from './CommentList';
import NoRating from './NoRating';
import ReviewSummary from './ReviewSummary';
import ReviewForm from './ReviewForm';
const ProductReview = (props) => {
  const {
    title,
    reviews,
    ratingCount,
    averageRating,
    product,
    onSubmitReview,
    onLoadMore
  } = props;

  const ratingResults = useMemo(() => {
    const reviewKeys = [5, 4, 3, 2, 1];

    let reviewList = reviews.reviews.reduce(
      (obj, review) => ({
        ...obj,
        [review.rating]: {
          ...obj[review.rating],
          rating: review.rating,
          count:
            obj[review.rating] === undefined ? 1 : obj[review.rating].count + 1
        }
      }),
      {}
    );

    return reviewKeys.map((key) => ({
      score: (reviewList[key] && reviewList[key].rating) || key,
      count: (reviewList[key] && reviewList[key].count) || 0,
      average:
        (reviewList[key] &&
          Math.abs(reviewList[key].count / ratingCount).toFixed(2)) ||
        0
    }));
  }, [reviews.reviews, ratingCount]);

  const averageRate = useMemo(() => {
    return Number(averageRating).toFixed(1);
  }, [averageRating]);

  return (
    <>
      <Header as="h4" className="ec__product--body--title">
        <Icon.MessageCircle
          size={22}
          style={{
            marginRight: 10,
            position: 'relative',
            marginRight: 10,
            top: 4
          }}
        />
        {title}
      </Header>
      <div className={'ec__product--reviews'}>
        <ReviewSummary
          ratingCount={ratingCount}
          averageRate={averageRate}
          ratingResults={ratingResults}
        />
        {reviews.reviews.length > 0 && (
          <CommentList reviews={reviews} onLoadMore={onLoadMore} />
        )}
        <ReviewForm productId={product.id} onSubmitReview={onSubmitReview} />
      </div>
    </>
  );
};

export default ProductReview;
