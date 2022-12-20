import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART,
  UPDATE_CART
} from '../constants/actions';
import { isEmpty } from '../utils/helper';
const cartState = {
  items: [],
  count: 0,
  subTotal: 0,
  currency: 'VND',
  hasPromotion: false,
  promotionCode: '',
  discount: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { payload } = action;
      console.log(action);
      let newItems = [];
      // if (payload.isExistStorage) {
      if (state.count !== 0) {
        const item = state.items.find((item) => item.id === payload.data.id);
        if (item) {
          newItems = state.items.map((item) =>
            item.id === payload.data.id
              ? { ...item, quantity: item.quantity + payload.data.quantity }
              : item
          );
        } else {
          newItems = [...state.items, { ...payload.data }];
        }
      } else {
        newItems = [{ ...payload.data }];
      }

      state = {
        ...state,
        items: [...newItems],
        count: state.count + payload.data.quantity,
        subTotal: state.subTotal + payload.data.price * payload.data.quantity
      };
      // } else {
      //   state = {
      //     items: [{ ...payload.data }],
      //     count: payload.data.quantity,
      //     subTotal: payload.data.price * payload.data.quantity
      //   };
      // }

      return state;
    }
    case REMOVE_FROM_CART: {
      const newState = {};
      return newState;
    }
    case UPDATE_CART: {
      const { payload } = action;

      let newSubtotal = 0,
        newCount = 0,
        newItems = state.items;

      const item = state.items.find((item) => item.id === payload.id);

      if (payload.type === 'down' && item.quantity - payload.quantity === 0) {
        const indexOfItem = state.items.findIndex(
          (item) => item.id === payload.id
        );
        newItems.splice(indexOfItem, 1);
      } else {
        newItems = state.items.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                quantity:
                  payload.type === 'up'
                    ? item.quantity + payload.quantity
                    : item.quantity - payload.quantity
              }
            : item
        );
      }

      newSubtotal =
        payload.type === 'up'
          ? state.subTotal + payload.quantity * item.price
          : state.subTotal - payload.quantity * item.price;
      newCount =
        payload.type === 'up'
          ? state.count + payload.quantity
          : state.count - payload.quantity;

      return {
        ...state,
        items: newItems,
        subTotal: newSubtotal,
        count: newCount
      };
    }
    case LOAD_CART: {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};

      if (!isEmpty(cart)) {
        Object.keys(cart).forEach((key) => {
          state = {
            ...state,
            [key]: cart[key]
          };
        });
      }
      return state;
    }
    default:
      return state;
  }
};

export { cartState };
export default cartReducer;
