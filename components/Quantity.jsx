import { useEffect, useState, memo } from 'react';
const Quantity = ({
  onSetQuantity,
  quantity,
  title,
  value,
  id,
  size = 'medium'
}) => {
  return (
    <div className={`quantity ${size}`}>
      {(title && <span className="quantity__label">{title}</span>) || <></>}

      <div className="quantity__form">
        <div className="decrease" onClick={() => onSetQuantity('down', id)}>
          -
        </div>
        <div className="number">{quantity}</div>
        <div className="increase" onClick={() => onSetQuantity('up', id)}>
          +
        </div>
      </div>
    </div>
  );
};

export default memo(Quantity);
