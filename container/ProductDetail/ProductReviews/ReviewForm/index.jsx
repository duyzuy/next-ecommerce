import { useEffect, useState } from 'react';
import { Form, Rating } from 'semantic-ui-react';
import RateStars from '../../../../components/RateStars';

const ReviewForm = ({ productId, onSubmitReview }) => {
  const [reviewData, setReviewData] = useState({
    productId: 0,
    review: '',
    reviewer: '',
    reviewerEmail: '',
    rating: 0
  });

  useEffect(() => {
    setReviewData({
      ...reviewData,
      productId: productId
    });
  }, [productId]);
  const onChange = (key, val) => {
    setReviewData((prevReview) => ({
      ...prevReview,
      [key]: val
    }));
  };

  const onRate = (e, { rating, maxRating }) => {
    let rate = rating;

    if (rating > maxRating) return;
    if (rating === reviewData.rating) rate = 0;
    setReviewData((prevReview) => ({
      ...prevReview,
      rating: rate
    }));
  };
  return (
    <>
      <div className="review-form">
        <div className="review-form-rate">
          <div className="rate-control"></div>
        </div>
        <div className="review-control">
          <Form>
            <Form.Group inline>
              <label>Đánh giá</label>
              <Rating maxRating={5} onRate={onRate} size="massive" clearable />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Họ và tên"
                name="fullname"
                placeholder="Họ và tên"
                onChange={(e) => onChange('reviewer', e.target.value)}
              />
              <Form.Input
                fluid
                label="Email"
                name="email"
                placeholder="Email"
                onChange={(e) => onChange('reviewerEmail', e.target.value)}
              />
            </Form.Group>

            <Form.TextArea
              label="Bình luận"
              name="review"
              placeholder="Nhận xét sản phẩm"
              onChange={(e) => onChange('review', e.target.value)}
            />
            <Form.Checkbox label="Lưu thông tin cho bình luận kế tiếp" />
            <Form.Button
              type="button"
              onClick={() => onSubmitReview(reviewData)}
            >
              Gửi đánh giá
            </Form.Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default ReviewForm;
