import * as Icon from 'react-feather';
import { Header } from 'semantic-ui-react';
const NoRating = () => {
  return (
    <div className="no-comment">
      <span className="ec-icon">
        <Icon.Inbox size={54} style={{ color: '#d2d2d2' }} />
      </span>
      <div className="comment-text">
        <Header>Chưa có đánh giá & nhận xét</Header>
        <p>Nếu muốn nhận xét và đánh giá sản phẩm hãy đánh giá nha</p>
      </div>
      <p className="button">
        <span className="button button-review">
          <Icon.Star size={16} /> Đánh giá
        </span>
      </p>
    </div>
  );
};
export default NoRating;
