import { useState } from 'react';
import Button from '../../components/Button';

const PromotionCode = ({ code, onApplyCode, isValid }) => {
  const [promotionCode, setPromotionCode] = useState(code);
  const onChangePromotion = (code) => {
    setPromotionCode(code);
  };

  const onApplyPromotionCode = () => {
    if (promotionCode.length === 0) return;

    onApplyCode(promotionCode);
  };
  return (
    <div className="cart__promotion">
      <div className="cart__promotion--code">
        <div className="code"></div>
      </div>
      <div className="cart__promotion--form">
        <label htmlFor="promotionCode">Bạn có mã giảm giá?</label>
        <div className="promotion__control">
          <input
            id="promotionCode"
            className="input"
            value={promotionCode}
            placeholder="Mã giảm giá"
            onChange={(e) => onChangePromotion(e.target.value)}
          />
          <Button onClick={onApplyPromotionCode} color="primary">
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PromotionCode;
