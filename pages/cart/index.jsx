import { useMemo, useState } from 'react';
import { Container, Image, Header } from 'semantic-ui-react';
import styles from '../../styles/cart.module.scss';
import { useSelector } from '../../providers/hooks';
import { formatPrice } from '../../helpers/product';
import Quantity from '../../components/Quantity';
import { useDispatch } from '../../providers/hooks';
import { UPDATE_CART } from '../../constants/actions';
import useCart from '../../hooks/useCart';
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

    if (type === ACTIONS.UP) {
    }
    console.log(cartStorage);
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
                <div className="image">Hình ảnh</div>
                <div className="name">Tên sản phẩm</div>
                <div className="price">Giá tiền</div>
                <div className="quantity">Số lượng</div>
                <div className="subtotal">Tổng</div>
              </div>
              {items.map((item, index) => (
                <div key={index} className="cart-table-row">
                  <div className="image">
                    <Image src={item.images[0].src} width={48} height={48} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="price">
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <div className="quantity">
                    <Quantity
                      quantity={item.quantity}
                      value={quantity}
                      onSetQuantity={onSetQuantity}
                      id={item.id}
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
