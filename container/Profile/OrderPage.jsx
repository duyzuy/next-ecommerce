import { formatPrice } from '../../helpers/product';
const OrderPage = ({ title, orders }) => {
  return (
    <div className="account-page">
      <div className="section-header">
        <h3>{title}</h3>
      </div>
      <div className="section-content">
        <div className="inner-section">
          {orders.map((order) => (
            <div className="box order">
              <div className="box-inner">
                <div className="box-header">Đơn hàng: {`#${order.id}`}</div>
                <div className="box-body">
                  <div className="items">{order.line_items.length}</div>
                  <div className="total">{formatPrice(order.total)}</div>
                  <div className="status">{order.status}</div>
                  <div className="status">{order.payment_method_title}</div>
                </div>
                <div className="box-footer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
