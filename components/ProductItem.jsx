import { formatPrice } from '../helpers/product';
import * as Icon from 'react-feather';
import { Label } from 'semantic-ui-react';
import Button from './Button';
const ProductItem = ({ item, onViewOrderDetail }) => {
  const STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing'
  };

  return (
    <div
      className={`box order ${
        (item.status === STATUS.PROCESSING && 'in-process') || ''
      }`}
    >
      <div className="box-inner">
        <div className="box-header">{`Đơn hàng: #${item.id}`}</div>
        <div className="box-body">
          <div className="order-status">
            <Label className="value">
              {item.status === STATUS.PROCESSING ? 'Đang xử lý' : item.status}
            </Label>
          </div>
          <div className="items-count">
            <span className="label">Số lượng:</span>
            <span className="value">{item.line_items.length}</span>
          </div>
          <div className="total-price">
            <span className="label">Tổng tiền:</span>{' '}
            <span className="value">{formatPrice(item.total)}</span>
          </div>
          <div className="payment-type">
            <span className="label">Phương thức thanh toán:</span>
            <span className="value">{item.payment_method_title}</span>
          </div>
        </div>
        <div className="box-footer">
          <Button
            icon={() => <Icon.Eye size={14} />}
            onClick={() => onViewOrderDetail(item.id)}
            outline
            className="btn-view-order"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
