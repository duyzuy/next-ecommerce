import { memo } from 'react';
import { formatPrice } from '../helpers/product';
const SubtotalSummary = ({ data, currency }) => {
  return (
    <div className="booking__summary--subtoal">
      <div className="subtotal">
        <p className="subtotal-label">Tạm tính</p>
        <p className="subtotal-value">
          {formatPrice(data.products.subTotal, currency)}
        </p>
      </div>
      <div className="shipping">
        <p className="subtotal-label">Phí giao hàng</p>
        <p className="subtotal-value">
          {formatPrice(data.shippingCost, currency)}
        </p>
      </div>
      <div className={data.discountValue !== 0 ? 'discount valid' : 'discount'}>
        <p className="discount-label">
          Giảm giá
          {data.promotionCode ? (
            <>
              <span className="code">{data.promotionCode}</span>
            </>
          ) : (
            <></>
          )}
        </p>
        <p className="discount-value">
          {((data.discountValue !== 0 && '-') || '') +
            formatPrice(data.discountValue, currency)}
        </p>
      </div>
      <span className="line"></span>
      <div className="total">
        <p className="total-label">Tổng tiền</p>
        <p className="total-value">{formatPrice(data.total, currency)}</p>
      </div>
    </div>
  );
};
export default memo(SubtotalSummary);
