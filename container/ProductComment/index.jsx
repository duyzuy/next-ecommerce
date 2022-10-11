import { Button, Comment, Form, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import { useEffect, useMemo } from 'react';
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
  const ratingResults = useMemo(() => {
    return reviews.reduce((acc, obj) => {
      return Object.assign(acc, { [obj.rating]: [{ ...obj }] });
    }, {});
  }, [reviews]);

  console.log(ratingResults);
  const internalIp = async () => {
    if (!RTCPeerConnection) {
      throw new Error('Not supported.');
    }

    const peerConnection = new RTCPeerConnection({ iceServers: [] });

    peerConnection.createDataChannel('');
    peerConnection.createOffer(
      peerConnection.setLocalDescription.bind(peerConnection),
      () => {}
    );

    peerConnection.addEventListener('icecandidateerror', (event) => {
      throw new Error(event.errorText);
    });

    return new Promise(async (resolve) => {
      peerConnection.addEventListener('icecandidate', async ({ candidate }) => {
        peerConnection.close();

        if (candidate && candidate.candidate) {
          const result = candidate.candidate.split(' ')[4];

          if (result.endsWith('.local')) {
            const inputDevices =
              await navigator.mediaDevices.enumerateDevices();
            const inputDeviceTypes = inputDevices.map(({ kind }) => kind);

            const constraints = {};

            if (inputDeviceTypes.includes('audioinput')) {
              constraints.audio = true;
            } else if (inputDeviceTypes.includes('videoinput')) {
              constraints.video = true;
            } else {
              throw new Error('An audio or video input device is required!');
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            mediaStream.getTracks().forEach((track) => track.stop());
            resolve(internalIp());
          }
          resolve(result);
        }
      });
    });
  };
  useEffect(() => {
    (async () => {
      const ip = await internalIp();
      console.log(ip);
    })();
  }, []);
  const CommentList = ({ commentReviews }) => {
    return (
      <>
        <div className="reviewResult">
          <div className="starts">
            <Icon.Star
              size={40}
              style={{
                fill: '#F4BE2C',
                color: '#F4BE2C'
              }}
            />
          </div>
          <div className="status">
            <div className="status-bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
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
