import { memo } from 'react';
const PaymentTypeItem = ({ curentMethod, data, onSelectPaymentMethod }) => {
  return (
    <div
      className={
        (curentMethod.id === data.id && `payment__type active`) ||
        'payment__type'
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
