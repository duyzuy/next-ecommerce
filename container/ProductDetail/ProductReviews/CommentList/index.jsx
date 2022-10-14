import { useCallback, useMemo } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import RateStars from '../../../../components/RateStars';
import { formatDate } from '../../../../utils/date';
const CommentList = ({ reviews, onLoadMore }) => {
  return (
    <>
      <Comment.Group>
        <Header as="h3">Nhận xét</Header>
        {reviews.reviews.map((review) => (
          <Comment key={review.id}>
            <Comment.Avatar src={review.reviewer_avatar_urls[96]} />
            <Comment.Content>
              <Comment.Author as="a">{review.reviewer}</Comment.Author>
              <Comment.Metadata>
                <span className="cm-date">
                  {formatDate(review.date_created)}
                </span>
                <span
                  className="spacing"
                  style={{ marginLeft: 5, marginRight: 5 }}
                ></span>
                <span className="cm-rating">
                  <RateStars rate={review.rating} size={12} />
                </span>
              </Comment.Metadata>

              <Comment.Text>
                <div dangerouslySetInnerHTML={{ __html: review.review }}></div>
              </Comment.Text>
              {/* <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions> */}
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
      <div className="btn-loadmore">
        <button className="ui blue basic button fluid" onClick={onLoadMore}>
          Xem thêm bình luận
        </button>
      </div>
    </>
  );
};
export default CommentList;
