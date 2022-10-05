import React, { useEffect, useState } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
const ProductReviews = (props) => {
  console.log(props);
  const { reviews } = props;
  return (
    <>
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {reviews.map((review) => {
          return (
            <Comment>
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
                  <div
                    dangerouslySetInnerHTML={{ __html: review.review }}
                  ></div>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </>
  );
};

export default ProductReviews;
