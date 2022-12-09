import { useEffect, useState, memo } from 'react';
const Quantity = ({ onSetQuantity, quantity, title, value, id }) => {
  return (
    <div className="ec__product--quantity">
      {title ?? <label>{title}</label>}
      <div className="quantity">
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
