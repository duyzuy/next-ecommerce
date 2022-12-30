import { memo } from 'react';
import { formatPrice } from '../helpers/product';
const SubtotalSummary = ({ bookingInfor, currency }) => {
  return (
    <div className="booking__summary--subtoal">
      <div className="subtotal">
        <p className="subtotal-label">Tạm tính</p>
        <p className="subtotal-value">
          {formatPrice(bookingInfor.products.subTotal, currency)}
        </p>
      </div>
      <div className="shipping">
        <p className="subtotal-label">Phí giao hàng</p>
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
  );
};
export default memo(SubtotalSummary);
