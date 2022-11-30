import { formatPrice } from '../helpers/product';
const ProductItem = ({ item }) => {
  return (
    <>
      <div className="box order">
        <div className="box-inner">
          <div className="box-header">Đơn hàng: {`#${item.id}`}</div>
          <div className="box-body">
            <div className="items">{item.line_items.length}</div>
            <div className="total">{formatPrice(item.total)}</div>
            <div className="status">{item.status}</div>
            <div className="status">{item.payment_method_title}</div>
          </div>
          <div className="box-footer"></div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
