import { memo } from 'react';
const PaymentTypeItem = ({ active, data, onSelectPaymentMethod }) => {
  return (
    <div
      className={
        (active === data.id && `payment__type active`) || 'payment__type'
      }
    >
      <div
        className="payment__type--header"
        onClick={() => onSelectPaymentMethod(data)}
      >
        <span className="check"></span>
        <p className="title">{data.title}</p>
      </div>
      <div className="payment__type--body">
        <div className="content">{data.description}</div>
      </div>
    </div>
  );
};
export default memo(PaymentTypeItem);
