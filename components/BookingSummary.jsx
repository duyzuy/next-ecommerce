import { memo, useCallback, useMemo, useEffect } from 'react';
import { formatPrice } from '../helpers/product';
import Button from './Button';
import { client } from '../api/client';
import { DISCOUNT_TYPE } from '../constants/constants';
import { isExpired } from '../utils/date';
import { toast } from '../lib/toast';
import { useDispatch, useSelector } from '../providers/hooks';
import {
  UPDATE_PRICE_ON_CART,
  UPDATE_PAYMENT_TERM,
  SELECT_PAYMENT_METHOD
} from '../constants/actions';
import PromotionCode from '../container/Promotion';
import PaymentTypeItem from './PaymentTypeItem';
import ProductSummaryItems from './ProductSummaryItems';
import SubtotalSummary from './SubtotalSummary';
import PaymentTerm from './PaymentTerm';
import CustomLoader from './CustomLoader';

const ACTIONS = {
  REMOVE_CODE: 'removeCode',
  ADD_CODE: 'addCode'
};

const BookingSummary = ({
  bookingInfor,
  currency,
  router,
  page = 'cart',
  isLoading = false,
  onSubmitOrder,
  errors
}) => {
  const dispatch = useDispatch();
  const bookingItems = bookingInfor.products.items;

  const paymentGateWay = useSelector((state) => state.setting.wcPaymentGateWay);

  const handleApplyCode = useCallback(async (code) => {
    const response = await client.get(`coupon`, {
      code: code
    });

    if (response.status === 200 && response.data.length > 0) {
      const coupon = response.data[0];
      const subTotal = bookingInfor.products.subTotal;
      //handle expired date
      if (coupon.date_expires !== null && isExpired(coupon.date_expires)) {
        toast({
          type: 'error',
          message: `Mã giảm giá đã hết hạn`
        });
        return;
      }
      const discountType = coupon.discount_type;
      const amount = Number.parseFloat(coupon.amount);
      const minimumAmount = Number.parseFloat(coupon.minimum_amount);
      const maximumAmount = Number.parseFloat(coupon.maximum_amount);
      const usageLimit = coupon.usage_limit;
      const usageLimitPerUser = coupon.usage_limit_per_user;
      const usageCount = coupon.usage_count;
      const usedBy = coupon.used_by;
      const prdCategoryApply = coupon.product_categories;
      const excludeSaleItem = coupon.exclude_sale_items;

      if (excludeSaleItem) {
        const hasItemOnSale = bookingItems.find((item) => item.onSale === true);
        if (hasItemOnSale) {
          toast({
            type: 'error',
            message: `Mã giảm giá không áp dụng cho sản phẩm đang sale`
          });
          return;
        }
      }

      //check minimum amount
      let nummberOfDiscount = minimumAmount;
      if (minimumAmount > subTotal) {
        toast({
          type: 'error',
          message: `Số tiền mua tối thiểu để sử dụng mã ưu đãi này là ${formatPrice(
            minimumAmount
          )}`
        });
        return;
      }
      if (subTotal > maximumAmount && maximumAmount !== 0) {
        toast({
          type: 'error',
          message: `Số tiền mua tối đa để sử dụng mã ưu đãi này là ${formatPrice(
            maximumAmount
          )}`
        });
        return;
      }

      //check type discount
      switch (coupon.discount_type) {
        case DISCOUNT_TYPE.PERCENT: {
          const discountAmount = (amount * subTotal) / 100;
          if (discountAmount > minimumAmount && minimumAmount !== 0) {
            nummberOfDiscount = discountAmount;
          }

          if (discountAmount > maximumAmount && maximumAmount !== 0) {
            nummberOfDiscount = maximumAmount;
          }
          break;
        }
        case DISCOUNT_TYPE.FIXED_CART: {
          if (amount > minimumAmount && minimumAmount !== 0) {
            nummberOfDiscount = amount;
          }

          if (amount > maximumAmount && maximumAmount !== 0) {
            nummberOfDiscount = maximumAmount;
          }
          break;
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
      if (usageCount > usageLimit && usageLimit !== null) {
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
          data: {
            id: coupon.id,
            couponCode: coupon.code,
            discountValue: nummberOfDiscount,
            amount: coupon.amount,
            discountType: coupon.discount_type
          },
          action: ACTIONS.ADD_CODE
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
        action: ACTIONS.REMOVE_CODE
      }
    });

    toast({
      type: 'success',
      message: `Đã huỷ áp dụng code - <strong>${code}</strong`
    });
  }, []);

  const onSelectPaymentMethod = (payment) => {
    console.log(payment);
    dispatch({
      type: SELECT_PAYMENT_METHOD,
      payload: {
        ...payment
      }
    });
  };
  const handleAcceptTerm = (value) => {
    dispatch({
      type: UPDATE_PAYMENT_TERM,
      payload: {
        isAcceptTerm: value
      }
    });
  };

  const paymentGateWayActive = useMemo(() => {
    return paymentGateWay.filter((item) => item.enabled);
  }, [paymentGateWay]);

  const onSubmitButton = useCallback(() => {
    if (page === 'cart') {
      router.push('/payment');
    } else {
      onSubmitOrder();
    }
  }, [page, bookingInfor]);

  return (
    <div className={`booking__summary ${page}`}>
      <PromotionCode
        code={bookingInfor.promotionCode}
        onApplyCode={handleApplyCode}
        hasPromotion={bookingInfor.hasPromotion}
        onRemoveCode={handleRemoveCode}
      />

      {(page === 'payment' && (
        <ProductSummaryItems data={bookingItems} currency={currency} />
      )) || <></>}
      <SubtotalSummary data={bookingInfor} currency={currency} />
      {(page === 'payment' && (
        <div className="booking__summary--payment-gate">
          {(isLoading && <CustomLoader inline="centered" size="small" />) ||
            paymentGateWayActive.map((item, index) => (
              <PaymentTypeItem
                data={item}
                key={item.id}
                curentMethod={bookingInfor?.paymentMethod}
                onSelectPaymentMethod={onSelectPaymentMethod}
              />
            ))}
        </div>
      )) || <></>}
      {(page === 'payment' && (
        <PaymentTerm
          onAcceptTerm={handleAcceptTerm}
          isAccept={bookingInfor.isAcceptTerm}
          error={errors?.isAcceptTerm}
        />
      )) || <></>}
      <div className="booking__summary--actions">
        <Button color="primary" onClick={onSubmitButton}>
          {(page === 'cart' && 'Tiến hành thanh toán?') || 'Thanh toán ngay'}
        </Button>
      </div>
    </div>
  );
};
export default memo(BookingSummary);
