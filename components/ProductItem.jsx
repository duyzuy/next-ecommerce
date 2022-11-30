import { formatPrice } from '../helpers/product';
const ProductItem = ({ item, viewOrderDetail }) => {
  return (
    <>
      <div className="box order">
        <div className="box-inner">
          <div className="box-header">Đơn hàng: {`#${item.id}`}</div>
          <div className="box-body">
            <div className="items">Số lượng: {item.line_items.length}</div>
            <div className="total">Tổng tiền: {formatPrice(item.total)}</div>
            <div className="status">
              Trạng thái:
              {item.status === 'processing' ? 'Đang xử lý' : item.status}
            </div>
            <div className="status">
              Phương thức thanh toán: {item.payment_method_title}
            </div>
          </div>
          <div className="box-footer">
            <button onClick={() => viewOrderDetail(item.id)}>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
