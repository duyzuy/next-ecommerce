import { useEffect, useCallback } from 'react';
import { Container, Header } from 'semantic-ui-react';
import styles from '../../styles/cart.module.scss';
import { useSelector } from '../../providers/hooks';
import { useDispatch } from '../../providers/hooks';
import { UPDATE_CART, UPDATE_PRICE_ON_CART } from '../../constants/actions';
import useCart from '../../hooks/useCart';
import * as Icon from 'react-feather';
import { client } from '../../api/client';
import { DISCOUNT_TYPE } from '../../constants/constants';
import { isExpired } from '../../utils/date';
import { toast } from '../../lib/toast';
import { useRouter } from 'next/router';
import { setPayment, isPayment } from '../../constants/booking';
import CartItems from '../../components/CartItems';
import BookingSummary from '../../components/BookingSummary';
import BookingSteps from '../../components/BookingSteps';
import CartEmpty from '../../components/CartEmpty';
const ACTIONS = {
  REMOVE_CODE: 'removeCode',
  ADD_CODE: 'addCode'
};
const STEPS = [
  {
    step: 1,
    name: 'Chọn sản phẩm',
    key: 'selecting',
    icon: () => <Icon.Pocket size={18} />
  },
  {
    step: 2,
    name: 'Giỏ hàng',
    key: 'cart',
    icon: () => <Icon.ShoppingCart size={18} />
  },
  {
    step: 3,
    name: 'Thanh toán',
    key: 'payment',
    icon: () => <Icon.CreditCard size={18} />
  },
  {
    step: 4,
    name: 'Hoàn thành',
    key: 'thankyou',
    icon: () => <Icon.Smile size={18} />
  }
];
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

  const handleApplyCode = useCallback(async (code) => {
    const response = await client.get(`coupon`, {
      code: code
    });
    console.log(response.data[0]);
    if (response.status === 200 && response.data.length > 0) {
      const coupon = response.data[0];
      //handle expired date
      if (coupon.date_expires !== null && isExpired(coupon.date_expires)) {
        toast({
          type: 'error',
          message: `Mã giảm giá đã hết hạn`
        });
        return;
      }
      const discountType = coupon.discount_type;
      const amount = Number.parseFloat(coupon.amount).toFixed();
      const minimumAmount = Number.parseFloat(coupon.minimum_amount).toFixed();
      const maximumAmount = Number.parseFloat(coupon.maximum_amount).toFixed();
      const usageLimit = coupon.usage_limit;
      const usageLimitPerUser = coupon.usage_limit_per_user;
      const usageCount = coupon.usage_count;
      const usedBy = coupon.used_by;
      const prdCategoryApply = coupon.product_categories;

      //check minimum amount
      let nummberOfDiscount = minimumAmount;

      //check type discount
      if (coupon.discount_type === DISCOUNT_TYPE.PERCENT) {
        const discountNumber = (amount * bookingInfor.products.subTotal) / 100;
        if (discountNumber > minimumAmount && minimumAmount !== 0) {
          nummberOfDiscount = discountNumber;
        }

        if (discountNumber > maximumAmount && maximumAmount !== 0) {
          nummberOfDiscount = maximumAmount;
        }
      }

      if (coupon.discount_type === DISCOUNT_TYPE.FIXED_CART) {
        if (amount > minimumAmount && minimumAmount !== 0) {
          nummberOfDiscount = amount;
        }

        if (amount > maximumAmount && maximumAmount !== 0) {
          nummberOfDiscount = maximumAmount;
        }
      }

      //check category valid in cart order
      let isValidCategory = true;
      const prdCatInCart = bookingInfor.products.items.reduce((acc, item) => {
        item.categories.forEach((cat, index) => {
          if (!acc.includes(cat.id)) {
            acc.push(cat.id);
          }
        });
        return acc;
      }, []);

      if (prdCategoryApply.length > 0) {
        prdCategoryApply.forEach((cat, index) => {
          if (!prdCatInCart.includes(cat)) {
            isValidCategory = false;
            return;
          }
        });
      }
      if (!isValidCategory) {
        toast({
          type: 'warning',
          message: `Giỏ hàng chứa sản phẩm không nằm trong danh mục giảm giá`
        });
        return;
      }

      //check code is is current applied
      if (code === bookingInfor.promotionCode) {
        toast({
          type: 'warning',
          message: `Mã giảm giá đã được áp dụng`
        });
        return;
      }

      //check limit usage and limit by user
      if (usageCount > usageLimit) {
        toast({
          type: 'warning',
          message: `Số lượng sử dụng đã hết`
        });
        return;
      }
      // success in all case
      disPatch({
        type: UPDATE_PRICE_ON_CART,
        payload: {
          couponCode: code,
          discountValue: nummberOfDiscount,
          discountType: discountType,
          type: ACTIONS.ADD_CODE
        }
      });
      toast({
        type: 'success',
        message: `Áp dụng mã thành công`
      });
    } else if (response.status === 200 && response.data.length === 0) {
      toast({
        type: 'error',
        message: `Mã giảm giá không hợp lệ`
      });
    }
  }, []);
  const handleRemoveCode = useCallback((code) => {
    disPatch({
      type: UPDATE_PRICE_ON_CART,
      payload: {
        couponCode: code,
        type: ACTIONS.REMOVE_CODE
      }
    });

    toast({
      type: 'success',
      message: `Đã huỷ áp dụng code - <strong>${code}</strong`
    });
  }, []);
  useEffect(() => {
    setPayment(true);
    if (bookingInfor.products.count === 0) {
      setPayment(false);
    }
  }, [bookingInfor]);
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className="page-header">
          <Header
            size="large"
            textAlign="center"
            style={{ marginBottom: '30px' }}
          >
            Giỏ hàng
          </Header>
          <BookingSteps active={['selecting']} current="cart" steps={STEPS} />
        </div>
        <div className="page-body">
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
                  onApplyCode={handleApplyCode}
                  onRemoveCode={handleRemoveCode}
                  router={router}
                />
              </div>
            </>
          )}
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
