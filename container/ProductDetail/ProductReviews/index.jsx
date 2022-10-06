import { Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import ProductComment from '../../ProductComment';
const ProductReview = (props) => {
  const { reviews } = props;
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
        Nhận xét & đánh giá
      </Header>
      <div className={'ec__product--reviews'}>
        <ProductComment reviews={reviews} />
      </div>
    </>
  );
};

export default ProductReview;
