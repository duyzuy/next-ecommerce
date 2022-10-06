import { Button, Comment, Form, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
const ProductComment = (props) => {
  const { reviews } = props;

  const NoReview = () => {
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

  const CommentList = ({ commentReviews }) => {
    return (
      <>
        <Header as="h3" dividing>
          Comments
        </Header>
        {commentReviews.map((review) => (
          <Comment key={review.id}>
            <Comment.Avatar src={review.reviewer_avatar_urls[96]} />
            <Comment.Content>
              <Comment.Author as="a">{review.reviewer}</Comment.Author>
              <Comment.Metadata>
                <span className="cm-date">{review.date_created}</span>
                <span className="spacing">|</span>
                <span className="cm-rating">
                  Đánh giá {review.rating}{' '}
                  <Icon.Star
                    size={12}
                    style={{ position: 'relative', top: 2 }}
                  />
                </span>
              </Comment.Metadata>

              <Comment.Text>
                <div dangerouslySetInnerHTML={{ __html: review.review }}></div>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </>
    );
  };
  return (
    <>
      <Comment.Group>
        {reviews.length > 0 ? (
          <CommentList commentReviews={reviews} />
        ) : (
          <NoReview />
        )}

        {/* <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form> */}
      </Comment.Group>
    </>
  );
};

export default ProductComment;
