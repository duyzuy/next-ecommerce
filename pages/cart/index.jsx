import { useMemo, useState, useEffect, useCallback, memo } from 'react';
import { Container, Image, Header } from 'semantic-ui-react';
import styles from '../../styles/cart.module.scss';
import { useSelector } from '../../providers/hooks';
import { formatPrice } from '../../helpers/product';
import Quantity from '../../components/Quantity';
import { useDispatch } from '../../providers/hooks';
import { UPDATE_CART, UPDATE_PRICE_ON_CART } from '../../constants/actions';
import useCart from '../../hooks/useCart';
import * as Icon from 'react-feather';
import PromotionCode from '../../container/Promotion';
import { client } from '../../api/client';
import { DISCOUNT_TYPE } from '../../constants/constants';
import { isExpired } from '../../utils/date';
import { toast } from '../../lib/toast';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { useRouter } from 'next/router';
import { setPayment, isPayment } from '../../constants/booking';
import CartItems from '../../components/CartItems';
import BookingSummary from '../../components/BookingSummary';
const ACTIONS = {
  REMOVE_CODE: 'removeCode',
  ADD_CODE: 'addCode'
};

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

  const onSetQuantity = (type, id) => {
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
  };

  const EmptyCart = () => {
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
  const handleApplyCode = async (code) => {
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
  };
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
          {(!bookingItems.length && <EmptyCart />) || (
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

export default memo(CartPage);

export async function getServerSideProps(ctx) {
  return {
    props: {}
  };
}
