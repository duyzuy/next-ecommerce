<<<<<<< HEAD
=======
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../providers/hooks';

export const toast = (message = '', options = {}) => {
  return message;
};

const Toast = (props) => {
  const lists = useSelector((state) => state.toast);
  console.log(lists);
  return (
    <div className="toast-container">
      {lists.message.map((mess) => (
        <p>{mess.content}</p>
      ))}
    </div>
  );
};

export default Toast;
>>>>>>> refs/remotes/origin/main
