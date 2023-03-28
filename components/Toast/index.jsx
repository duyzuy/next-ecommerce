import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../providers/hooks';

const toast = (message = '', options = {}) => {
  return message;
};

const Toast = (props) => {
  const lists = useSelector((state) => state.toast);
  console.log(lists);

  // const toast = (message = '', options = {}) => {
  //   return message;
  // };
  return (
    <div className="toast-container">
      {lists.message.map((mess) => (
        <p key={mess}>{mess.content}</p>
      ))}
    </div>
  );
};

export default Toast;
export { toast };
