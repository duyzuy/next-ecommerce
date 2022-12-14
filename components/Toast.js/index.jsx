import React, { useState, useEffect } from 'react';

const Toast = ({ toastList = [] }) => {
  const [lists, setLists] = useState([...toastList]);
  const onSetlist = (message) => {
    console.log(message);
    setLists(message);
  };
  console.log(lists);
  return (
    <div className="toast-container">{lists?.map((list) => list.message)}</div>
  );
};

export default Toast;

const toast = (message, options = {}) => {
  let messages = ['11111'];
  messages.push(message);
  console.log(messages);
  //   Toast.onSetlist('okeeee');
  //   Toast.onSetlist(message);
  console.log(<Toast toastList={messages} />);
};

export { toast };
