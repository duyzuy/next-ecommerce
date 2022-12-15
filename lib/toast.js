import React, { useState, useEffect } from 'react';

const makeid = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const toast = ({ type, message }) => {
  const toast = document.getElementById('toast');
  if (toast === null) return;

  const divContainer = document.createElement('div');
  divContainer.classList.add('toast__container');

  const newItem = document.createElement('div');
  newItem.classList.add('toast__item');

  const itemInner = document.createElement('div');
  itemInner.classList.add('toast__item--inner');

  const spanIcon = document.createElement('span');
  spanIcon.classList.add('toast__icon');

  const wrapContentDiv = document.createElement('div');
  wrapContentDiv.classList.add('toast__content');

  const newContent = document.createTextNode(message);
  wrapContentDiv.appendChild(newContent);

  const id = makeid(10);
  newItem.setAttribute('id', id);

  switch (type) {
    case 'error': {
      newItem.classList.add('error');
      spanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>`;
      break;
    }
    case 'success': {
      newItem.classList.add('success');
      spanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;
      break;
    }
    case 'warning': {
      newItem.classList.add('warning');
      spanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg>`;
      break;
    }
    case 'infor': {
      newItem.classList.add('infor');
      spanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>`;
      break;
    }
    default: {
    }
  }
  const timmer = setTimeout(() => {
    const element = document.getElementById(id);
    toast.removeChild(element);
    clearTimeout(timmer);
  }, 20000);

  itemInner.appendChild(spanIcon);
  itemInner.appendChild(wrapContentDiv);
  newItem.appendChild(itemInner);
  //   console.log(divContainer.childNodes.length);
  //   divContainer.appendChild(newItem);
  toast.appendChild(newItem);
  // if (divContainer.childNodes.length === 0) {
  //   toast.appendChild(divContainer);
  // }
};

export const Toast = () => {
  return <div id="toast" className="toast"></div>;
};
