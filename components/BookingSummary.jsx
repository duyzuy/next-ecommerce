import { memo } from 'react';
import PromotionCode from '../container/Promotion';
import { formatPrice } from '../helpers/product';
import Button from './Button';
const BookingSummary = ({
  bookingInfor,
  currency,
  onApplyCode,
  onRemoveCode,
  router
}) => {
  console.log('summary render');
  return (
    <div className="summary">
      <PromotionCode
        code={bookingInfor.promotionCode}
        onApplyCode={onApplyCode}
        hasPromotion={bookingInfor.hasPromotion}
        onRemoveCode={onRemoveCode}
      />
      <div className="cart__summary">
        <div className="subtotal">
          <p className="subtotal-label">Tạm tính</p>
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
        <div className="cart-actions">
          <Button color="primary" onClick={() => router.push('/payment')}>
            Tiến hành thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(BookingSummary);
