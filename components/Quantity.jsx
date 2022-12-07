import { useEffect, useState, memo } from 'react';
const Quantity = ({ onSetQuantity, quantity }) => {
  console.log('render');
  return (
    <div className="ec__product--quantity">
      <label>Chọn số lượng</label>
      <div className="quantity">
        <div className="decrease" onClick={() => onSetQuantity('down')}>
          -
        </div>
        <div className="number">{quantity}</div>
        <div className="increase" onClick={() => onSetQuantity('up')}>
          +
        </div>
      </div>
    </div>
  );
};

export default memo(Quantity);
