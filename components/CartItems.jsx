import { memo } from 'react';
import * as Icon from 'react-feather';
import { formatPrice } from '../helpers/product';
import Quantity from './Quantity';

import { Image } from 'semantic-ui-react';
const CartItems = ({ items, onSetQuantity, currency }) => {
  console.log('item render');
  return (
    <div className="table cart">
      {items?.map((item, index) => (
        <div className="product__item" key={item.id}>
          <div className="product__name">
            <div className="product__image">
              <Image src={item.images[0].src} fill="true" />
            </div>
            <div className="product__content">
              <p className="name">{item.name}</p>
              <p className="price">{formatPrice(item.price, currency)}</p>
            </div>
          </div>
          <div className="product__quantity">
            <Quantity
              quantity={item.quantity}
              value={item.quantity}
              onSetQuantity={onSetQuantity}
              id={item.id}
              size="small"
            />
          </div>
          <div className="product__subtotal">
            <p>{formatPrice(item.price * item.quantity, currency)}</p>
          </div>
          <span className="btn-remove">
            <Icon.Trash size={12} style={{ color: '#c83a3a' }} />
          </span>
        </div>
      ))}
    </div>
  );
};
export default memo(CartItems);
