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
      if (payload.isExistStorage) {
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
      } else {
        state = {
          items: [{ ...payload.data }],
          count: payload.data.quantity,
          subTotal: payload.data.price * payload.data.quantity
        };
      }

      return state;
    }
    case REMOVE_FROM_CART: {
      const newState = {};
      return newState;
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

export { cartState, cartReducer };
