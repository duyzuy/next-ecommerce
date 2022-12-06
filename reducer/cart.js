import { ADD_TO_CART, REMOVE_FROM_CART, LOAD_CART } from '../constants/actions';
import { isEmpty } from '../utils/helper';
const cartState = {
  items: [],
  count: 0,
  subTotal: 0,
  isLoading: false,
  currency: 'VND'
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { payload } = action;
      let newItems = [];

      if (state.count !== 0) {
        const item = state.items.find((item) => item.id === payload.id);
        if (item) {
          newItems = state.items.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item
          );
        } else {
          newItems = [...state.items, { ...payload }];
        }
      } else {
        newItems = [{ ...payload }];
      }

      return {
        ...state,
        items: [...newItems],
        count: state.count + payload.quantity,
        subTotal: state.subTotal + payload.price * payload.quantity
      };
    }
    case REMOVE_FROM_CART: {
      const newState = {};
      return newState;
    }
    case LOAD_CART: {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      let newState = {};
      if (!isEmpty(cart)) {
        Object.keys(cart).forEach((key) => {
          newState = {
            ...state,
            [key]: cart[key]
          };
        });
      }
      return newState;
    }
    default:
      return state;
  }
};

export { cartState, cartReducer };
