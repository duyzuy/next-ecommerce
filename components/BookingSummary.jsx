import { memo, useCallback, useMemo } from 'react';
import PromotionCode from '../container/Promotion';
import { formatPrice } from '../helpers/product';
import Button from './Button';
import { client } from '../api/client';
import { DISCOUNT_TYPE } from '../constants/constants';
import { isExpired } from '../utils/date';
import { toast } from '../lib/toast';
import { useDispatch, useSelector } from '../providers/hooks';
import { UPDATE_PRICE_ON_CART } from '../constants/actions';

const ACTIONS = {
  REMOVE_CODE: 'removeCode',
  ADD_CODE: 'addCode'
};

const BookingSummary = ({ bookingInfor, currency, router, step = 'cart' }) => {
  const dispatch = useDispatch();
  const bookingItems = bookingInfor.products.items;
  const paymentGateWay = useSelector(
    (state) => state.setting.woocommercePaymentGateWay
  );

  const handleApplyCode = useCallback(async (code) => {
    const response = await client.get(`coupon`, {
      code: code
    });

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
      dispatch({
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
    dispatch({
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

  return (
    <div className={`booking__summary ${step}`}>
      <PromotionCode
        code={bookingInfor.promotionCode}
        onApplyCode={handleApplyCode}
        hasPromotion={bookingInfor.hasPromotion}
        onRemoveCode={handleRemoveCode}
      />
      {(step === 'payment' && bookingItems.length > 0 && (
        <div className="booking__summary--items">
          <div className="header">
            <p className="name">Sản phẩm</p>
            <p className="quantity">Số lượng</p>
            <p className="price">Giá tiền</p>
          </div>
          {bookingItems.map((item, index) => (
            <div className="item" key={index}>
              <p className="name">{item.name}</p>
              <p className="quantity">{item.quantity}</p>
              <p className="price">
                {formatPrice(item.price * item.quantity, currency)}
              </p>
            </div>
          ))}
        </div>
      )) || <></>}

      <div className="booking__summary--subtoal">
        <div className="subtotal">
          <p className="subtotal-label">Tạm tính</p>
          <p className="subtotal-value">
            {formatPrice(bookingInfor.products.subTotal, currency)}
          </p>
        </div>
        <div className="shipping">
          <p className="subtotal-label">Giao hàng</p>
          <p className="subtotal-value">
            {formatPrice(bookingInfor.products.subTotal, currency)}
          </p>
        </div>
        <div
          className={
            bookingInfor.discountValue !== 0 ? 'discount valid' : 'discount'
          }
        >
          <p className="discount-label">
            Giảm giá
            {bookingInfor.promotionCode ? (
              <>
                <span className="code">{bookingInfor.promotionCode}</span>
              </>
            ) : (
              <></>
            )}
          </p>
          <p className="discount-value">
            {(bookingInfor.discountValue !== 0 &&
              `-${formatPrice(bookingInfor.discountValue, currency)}`) ||
              0}
          </p>
        </div>
        <span className="line"></span>
        <div className="total">
          <p className="total-label">Tổng tiền</p>
          <p className="total-value">
            {formatPrice(bookingInfor.total, currency)}
          </p>
        </div>
      </div>
      <div className="booking__summary--payment-gate">
        {paymentGateWay.map((item, index) => {
          if (item.enabled) {
            return (
              <div className="payment__type active" key={index}>
                <div className="payment__type--header">
                  <span className="check"></span>
                  <p className="title">{item.title}</p>
                </div>
                <div className="payment__type--body">
                  <div className="content">{item.description}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="booking__summary--actions">
        <Button color="primary" onClick={() => router.push('/payment')}>
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
};

export default memo(BookingSummary);
