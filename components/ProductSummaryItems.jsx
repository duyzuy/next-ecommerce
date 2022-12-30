import { memo } from 'react';
import { formatPrice } from '../helpers/product';
const ProductSummaryItems = ({ data = [], currency }) => {
  return (
    <div className="booking__summary--items">
      <div className="header">
        <p className="name">Sản phẩm</p>
        <p className="quantity">Số lượng</p>
        <p className="price">Giá tiền</p>
      </div>
      {data.map((item, index) => (
        <div className="item" key={item.id}>
          <p className="name">{item.name}</p>
          <p className="quantity">{item.quantity}</p>
          <p className="price">
            {formatPrice(item.price * item.quantity, currency)}
          </p>
        </div>
      ))}
    </div>
  );
};
export default memo(ProductSummaryItems);
