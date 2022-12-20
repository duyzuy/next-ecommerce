import { useMemo } from 'react';

const useCart = (options = {}) => {
  if (typeof window === 'undefined') return;

  const cart = useMemo(() => {
    const currentCart = JSON.parse(localStorage.getItem('cart'));

    if (currentCart === null) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          items: [],
          count: 0,
          subTotal: 0,
          currency: (options.currency && options.currency) || 'VND'
        })
      );
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          ...currentCart,
          currency: (options.currency && options.currency) || 'VND'
        })
      );
    }

    return currentCart;
  }, [options]);

  const addItem = ({ id, quantity, product = {} }) => {
    const newItem = {
      ...product,
      quantity: quantity
    };

    const prdItem = cart.items.find((item) => item.id === id);

    let newItems = [];
    //update cart if has prd item in cart
    if (prdItem) {
      newItems = cart.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newItems = [...cart.items, { ...newItem }];
    }

    localStorage.setItem(
      'cart',
      JSON.stringify({
        items: newItems,
        count: cart.count + quantity,
        subTotal: cart.subTotal + quantity * product.price
      })
    );
  };

  //remove item from cart
  const removeItem = ({ id, quantity }) => {
    const prdItem = cart.items.find((item) => item.id === id);

    if (!prdItem) return;

    let newItems = [],
      newCount = 0,
      newSubToal = 0;

    //check quantity of product in cart
    if (quantity < prdItem.quantity) {
      newItems = cart.items.map((item) =>
        item.id === prdItem.id
          ? { ...item, quantity: prdItem.quantity - quantity }
          : item
      );
      newCount = cart.count - quantity;
      newSubToal = cart.subTotal - prdItem * quantity;
    }

    //remove item if quantity larger than quantity of item in cart
    if (quantity > prdItem.quantity || quantity === prdItem.quantity) {
      const indexOfItem = cart.items.findIndex(
        (item) => item.id === prdItem.id
      );

      //remove item in cart
      newItems = cart.items;
      newItems.splice(indexOfItem, 1);
      newCount = cart.count - prdItem.quantity;
      newSubToal = cart.subTotal - prdItem.quantity * prdItem.price;
    }

    localStorage.setItem(
      'cart',
      JSON.stringify({
        items: newItems,
        count: newCount,
        subTotal: newSubToal
      })
    );
  };
  const updateItem = ({ id, quantity, action }) => {
    const item = cart.items.find((item) => item.id === id);

    let newItems = cart.items;
    let newCount = 0;
    let newSubToal = 0;
    if (!item) return;
    if (action === 'down' && item.quantity - quantity === 0) {
      const indexOfItem = cart.items.findIndex((item) => item.id === id);
      newItems.splice(indexOfItem, 1);
    } else {
      newItems = cart.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === 'up'
                  ? item.quantity + quantity
                  : item.quantity - quantity
            }
          : item
      );
    }

    if (action === 'up') {
      newCount = cart.count + quantity;
      newSubToal = cart.subTotal + item.price * quantity;
    }

    if (action === 'down') {
      newCount = cart.count - quantity;
      newSubToal = cart.subTotal - item.price * quantity;
    }

    localStorage.setItem(
      'cart',
      JSON.stringify({
        items: newItems,
        count: newCount,
        subTotal: newSubToal
      })
    );
  };
  const getItem = () => localStorage.getItem('cart');

  return {
    removeItem,
    addItem,
    getItem,
    updateItem
  };
};

export default useCart;
