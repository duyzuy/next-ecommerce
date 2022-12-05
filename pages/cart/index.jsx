import { useMemo } from 'react';
import { Container, Image, Header } from 'semantic-ui-react';
import styles from '../../styles/cart.module.scss';
import { useSelector } from '../../providers/hooks';
import { formatPrice } from '../../helpers/product';

const Price = ({ item }) => {
  if (item.salePrice !== 0) {
    return (
      <>
        <p className="price regular del">{formatPrice(item.regularPrice)}</p>
        <p className="price sale">{formatPrice(item.salePrice)}</p>
      </>
    );
  }

  return (
    <>
      <p className="price regular">{formatPrice(item.regularPrice)}</p>
    </>
  );
};

const SubTotal = ({ item }) => {
  if (item.salePrice !== 0) {
    return (
      <>
        <p className="price regular del">
          {formatPrice(item.regularPrice * item.quantity)}
        </p>
        <p className="price sale">
          {formatPrice(item.salePrice * item.quantity)}
        </p>
      </>
    );
  }

  return (
    <>
      <p className="price regular">
        {formatPrice(item.regularPrice * item.quantity)}
      </p>
    </>
  );
};

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

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
                <div className="quantity">Số lượng</div>
                <div className="price">Giá tiền</div>
                <div className="subtotal">Tạm tính</div>
              </div>
              {items.map((item, index) => (
                <div key={index} className="cart-table-row">
                  <div className="image">
                    <Image src={item.images[0].src} width={48} height={48} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="quantity">{item.quantity}</div>
                  <div className="price">
                    <Price item={item} />
                  </div>
                  <div className="subtotal">
                    <SubTotal item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-right"></div>
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
