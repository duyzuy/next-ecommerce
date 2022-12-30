import { memo } from 'react';
const PaymentTerm = ({ onAcceptTerm, isAccept }) => {
  return (
    <div className="booking__summary--term">
      <div
        className={(isAccept && 'form__check checked') || 'form__check'}
        onClick={() => onAcceptTerm(!isAccept)}
      >
        <span className="icon"></span>
        <p>
          Tôi đã đọc và đồng ý với <a href="#">điều kiện và điều khoản</a>
        </p>
      </div>
    </div>
  );
};
export default memo(PaymentTerm);
