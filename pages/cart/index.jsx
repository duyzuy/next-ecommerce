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
const ACTIONS = {
  UP: 'up',
  DOWN: 'down'
};
const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  const [quantity, setQuantity] = useState();

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
              <div className="cart-table-row header">
                <div className="action"></div>
                <div className="image">Hình ảnh</div>
                <div className="name">Tên sản phẩm</div>
                <div className="quantity">Số lượng</div>
                <div className="subtotal">Tổng tiền</div>
              </div>
              {items.map((item, index) => (
                <div key={index} className="cart-table-row">
                  <div className="btn-remove">
                    <Icon.Trash size={12} style={{ color: '#c83a3a' }} />
                  </div>
                  <div className="image">
                    <Image src={item.images[0].src} width={48} height={48} />
                  </div>
                  <div className="name">
                    {item.name}
                    <div className="price">
                      <p>{formatPrice(item.price)}</p>
                    </div>
                  </div>

                  <div className="cart-quantity">
                    <Quantity
                      quantity={item.quantity}
                      value={quantity}
                      onSetQuantity={onSetQuantity}
                      id={item.id}
                      size="small"
                    />
                  </div>
                  <div className="subtotal">
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-right">
            <div className="summary"></div>
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
