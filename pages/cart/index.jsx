import { useMemo, useState } from 'react';
import { Container, Image, Header } from 'semantic-ui-react';
import styles from '../../styles/cart.module.scss';
import { useSelector } from '../../providers/hooks';
import { formatPrice } from '../../helpers/product';
import Quantity from '../../components/Quantity';
import { useDispatch } from '../../providers/hooks';
import { UPDATE_CART } from '../../constants/actions';
import useCart from '../../hooks/useCart';
import * as Icon from 'react-feather';
import PromotionCode from '../../container/Promotion';
import { client } from '../../api/client';
import { discountType } from '../../constants/constants';
import { isExpired } from '../../utils/date';
import { toast } from '../../lib/toast';
const ACTIONS = {
  UP: 'up',
  DOWN: 'down'
};
const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  const disPatch = useDispatch();
  const cartStorage = useCart();
  const onSetQuantity = (type, id) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;

    disPatch({
      type: UPDATE_CART,
      payload: {
        id: id,
        quantity: 1,
        type: type
      }
    });

    cartStorage.updateItem({
      id,
      quantity: 1,
      action: type
    });
  };

  const onApplyPromotionCode = () => {};

  const handleApplyCode = async (code) => {
    const response = await client.get(`coupon`, {
      code: code
    });
    if (response.status === 200 && response.data.length > 0) {
      //handle expired date
      if (isExpired(response.data[0].date_expires)) {
        toast({
          type: 'error',
          message: `Mã giảm giá đã hết hạn`
        });
      }

      //check minimum amount

      //check limit usage and limit by user
    }
  };

  return (
    <Container>
      <div className={styles.cart__wrapper}>
        <div className="cart-header">
          <Header
            size="large"
            textAlign="center"
            style={{ marginBottom: '30px' }}
          >
            Giỏ hàng
          </Header>
        </div>
        <div className="cart-body">
          <div className="cart-left">
            <div className="table cart">
              <table>
                <thead>
                  <tr>
                    <th className="image">Hình ảnh</th>
                    <th className="name">Tên sản phẩm</th>
                    <th className="quantity">Số lượng</th>
                    <th className="subtotal">Tổng tiền</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="image">
                        <Image
                          src={item.images[0].src}
                          width={48}
                          height={48}
                        />
                      </td>
                      <td className="name">
                        {item.name}
                        <div className="price">
                          <p>{formatPrice(item.price)}</p>
                        </div>
                      </td>

                      <td className="cart-quantity">
                        <Quantity
                          quantity={item.quantity}
                          value={item.quantity}
                          onSetQuantity={onSetQuantity}
                          id={item.id}
                          size="small"
                        />
                      </td>
                      <td className="subtotal">
                        <p>{formatPrice(item.price * item.quantity)}</p>
                      </td>
                      <td className="btn-remove">
                        <Icon.Trash size={12} style={{ color: '#c83a3a' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="cart-right">
            <div className="summary">
              <PromotionCode
                code={cart.promotionCode}
                onApplyCode={handleApplyCode}
              />
              <div className="cart__summary">
                <div className="subtotal">
                  <p className="subtotal-label">Tạm tính</p>
                  <p className="subtotal-value">{cart.subTotal}</p>
                </div>
                <div className="discount">
                  <p className="subtotal-label">Giảm giá</p>
                  <p className="subtotal-value">{cart.discount}</p>
                </div>
                <div className="discount">
                  <p className="subtotal-label">Tổng tiền</p>
                  <p className="subtotal-value">{formatPrice(cart.subTotal)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;

export async function getServerSideProps(ctx) {
  return {
    props: {}
  };
}
