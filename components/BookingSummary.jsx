import { memo, useCallback, useMemo, useEffect } from 'react';
import PromotionCode from '../container/Promotion';
import { formatPrice } from '../helpers/product';
import Button from './Button';
import { client } from '../api/client';
import { DISCOUNT_TYPE } from '../constants/constants';
import { isExpired } from '../utils/date';
import { toast } from '../lib/toast';
import { useDispatch, useSelector } from '../providers/hooks';
import {
  UPDATE_PRICE_ON_CART,
  CHANGE_PAYMENT_METHOD,
  UPDATE_PAYMENT_TERM
} from '../constants/actions';
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
  isLoading = fasle,
  onSubmitOrder
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

  const onSelectPaymentMethod = (payment) => {
    dispatch({
      type: CHANGE_PAYMENT_METHOD,
      payload: {
        paymentMethod: payment.id,
        paymentMethodTitle: payment.title
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
      <SubtotalSummary bookingInfor={bookingInfor} currency={currency} />

      <div className="booking__summary--payment-gate">
        {(isLoading && <CustomLoader inline="centered" size="small" />) ||
          paymentGateWayActive.map((item, index) => (
            <PaymentTypeItem
              data={item}
              key={item.id}
              active={bookingInfor.order.paymentMethod}
              onSelectPaymentMethod={onSelectPaymentMethod}
            />
          ))}
      </div>
      <PaymentTerm
        onAcceptTerm={handleAcceptTerm}
        isAccept={bookingInfor.isAcceptTerm}
      />
      <div className="booking__summary--actions">
        <Button color="primary" onClick={onSubmitButton}>
          {(page === 'cart' && 'Tiến hành thanh toán ?') || 'Thanh toán ngay'}
        </Button>
      </div>
    </div>
  );
};

export default memo(BookingSummary);
