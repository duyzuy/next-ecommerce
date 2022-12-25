import { memo } from 'react';
import { Image } from 'semantic-ui-react';
import Button from './Button';

const CartEmpty = ({ router }) => {
  return (
    <div className="cart__empty">
      <div className="image">
        <Image src="./assets/images/cart-empty.png" fill="true" />
      </div>
      <div className="empty--content">
        <p className="title">Giỏ hàng của bạn đang trống</p>
        <p className="sub">Trở lại cửa hàng và lựa chọn sản phẩm yêu thích</p>
        <Button
          onClick={() => {
            router.push('/product');
          }}
          color="primary"
        >
          Trở về cửa hàng
        </Button>
      </div>
    </div>
  );
};
export default memo(CartEmpty);
