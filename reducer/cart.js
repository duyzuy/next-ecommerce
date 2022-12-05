import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/actions';
const cartState = {
  items: [],
  count: 0,
  subTotal: 0,
  isLoading: false
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { payload } = action;

      if (state.count !== 0) {
        const isExistsPrd = state.items.find((item) => item.id === payload.id);

        if (isExistsPrd) {
          const newItems = state.items.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item
          );
          state = {
            ...state,
            items: [...newItems],
            count: state.count + payload.quantity,
            subTotal: state.subTotal + payload.price * payload.quantity
          };
        } else {
          state = {
            ...state,
            items: [...state.items, { ...payload }],
            count: state.count + payload.quantity,
            subTotal: state.subTotal + payload.price * payload.quantity
          };
        }
      } else {
        state = {
          ...state,
          items: [...state.items, { ...payload }],
          count: state.count + payload.quantity,
          subTotal: state.subTotal + payload.price * payload.quantity
        };
      }

      return state;
    }
    case REMOVE_FROM_CART: {
      const newState = {};
      return newState;
    }
    default:
      return state;
  }
};

export { cartState, cartReducer };
