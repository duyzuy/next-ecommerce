import { useCallback, useState, useEffect } from 'react';
import { Form, Rating } from 'semantic-ui-react';

const ReviewForm = ({ onSubmitReview }) => {
  const [formData, setFormData] = useState({
    review: '',
    reviewer: '',
    reviewerEmail: '',
    rating: 0,
    agree: false
  });

  const onChange = useCallback((key, val) => {
    setFormData((prevReview) => ({
      ...prevReview,
      [key]: val
    }));
  }, []);

  const onRate = useCallback((e, { rating, maxRating }) => {
    let rate = rating;

    if (rating > maxRating) return;
    if (rating === formData.rating) rate = 0;
    setFormData((prevReview) => ({
      ...prevReview,
      rating: rate
    }));
  }, []);
  const resetFormData = () => {
    setFormData({ review: '', reviewer: '', reviewerEmail: '', rating: 0 });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmitReview(formData, resetFormData);
  };

  return (
    <div className="modal-review">
      <div className="review-form">
        <div className="review-control">
          <form className="ui form" onSubmit={onFormSubmit}>
            <div className="field rating-control">
              <label>Đánh giá</label>
              <Rating
                icon="start"
                maxRating={5}
                rating={formData.rating}
                onRate={onRate}
                size="massive"
                clearable
              />
            </div>
            <div className="equal width fields">
              <div className="field">
                <label>Họ và tên</label>
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={formData.reviewer}
                    onChange={(e) => onChange('reviewer', e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label>Email</label>
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="Email"
                    value={formData.reviewerEmail}
                    onChange={(e) => onChange('reviewerEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label>Bình luận</label>
              <textarea
                placeholder="Bình luận"
                rows="3"
                value={formData.review}
                onChange={(e) => onChange('review', e.target.value)}
              ></textarea>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  readOnly=""
                  tabIndex="0"
                  value={formData.agree}
                  checked={(formData.agree && 'checked') || ''}
                  onChange={(e) => onChange('agree', e.target.checked)}
                />
                <label>Lưu thông tin cho bình luận kế tiếp</label>
              </div>
            </div>
            <button className="ui button">Gửi đánh giá</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ReviewForm;
