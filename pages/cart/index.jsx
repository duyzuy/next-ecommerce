import { useCallback } from 'react';
import styles from '../../styles/cart.module.scss';
import { useSelector } from '../../providers/hooks';
import { useDispatch } from '../../providers/hooks';
import { UPDATE_CART } from '../../constants/actions';
import useCart from '../../hooks/useCart';
import { useRouter } from 'next/router';
import CartItems from '../../components/CartItems';
import BookingSummary from '../../components/BookingSummary';
import CartEmpty from '../../components/CartEmpty';
import { withBookingLayout } from '../../HOCs/withBookingLayout';

const CartPage = () => {
  const bookingInfor = useSelector((state) => state.booking);
  const currency = useSelector(
    (state) => state.setting.woocommerceCurrency?.value
  );
  // const { items } = cart;
  const router = useRouter();
  const disPatch = useDispatch();
  const cartStorage = useCart();

  const bookingItems = bookingInfor.products.items;

  const onSetQuantity = useCallback((type, id) => {
    const item = bookingItems.find((item) => item.id === id);
    if (!item) return;

    disPatch({
      type: UPDATE_CART,
      payload: {
        id: id,
        quantity: 1,
        type: type
      }
    });

    // cartStorage.updateItem({
    //   id,
    //   quantity: 1,
    //   action: type
    // });
  }, []);

  return (
    <>
      {(!bookingItems.length && <CartEmpty router={router} />) || (
        <>
          <div className="cart-left">
            <CartItems
              items={bookingItems}
              onSetQuantity={onSetQuantity}
              currency={currency}
            />
          </div>
          <div className="cart-right">
            <BookingSummary
              bookingInfor={bookingInfor}
              currency={currency}
              router={router}
              step="cart"
            />
          </div>
        </>
      )}
    </>
  );
};

export default withBookingLayout(CartPage, {
  title: 'Giỏ hàng',
  step: 'cart',
  styles: styles
});

export async function getServerSideProps(ctx) {
  return {
    props: {}
  };
}
