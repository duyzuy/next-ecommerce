import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART,
  UPDATE_CART,
  UPDATE_PRICE_ON_CART,
  ADD_PAYMENT_INFO,
  CHANGE_PAYMENT_METHOD,
  UPDATE_PAYMENT_INFOR
} from '../constants/actions';

const bookingState = {
  products: {
    items: [],
    count: 0,
    subTotal: 0
  },
  total: 0,
  hasPromotion: false,
  promotionCode: '',
  discountValue: 0,
  discountType: '',
  order: {
    payment_method: 'bacs',
    billing: {},
    shipping: {},
    line_items: [],
    shipping_lines: []
  }
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { payload } = action;

      let newItems = [];
      let totalPrice = 0;
      if (state.products.count !== 0) {
        const item = state.products.items.find(
          (item) => item.id === payload.id
        );
        if (item) {
          newItems = state.products.items.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item
          );
        } else {
          newItems = [...state.products.items, { ...payload }];
        }
      } else {
        newItems = [{ ...payload }];
      }
      const lineItems = newItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity
      }));
      totalPrice = payload.price * payload.quantity;
      state = {
        ...state,
        products: {
          items: [...newItems],
          count: state.products.count + payload.quantity,
          subTotal: state.products.subTotal + totalPrice
        },
        order: {
          ...state.order,
          line_items: [...lineItems]
        },
        total: state.total + totalPrice
      };

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
        newItems = state.products.items,
        newTotal = 0;

      const item = state.products.items.find((item) => item.id === payload.id);

      if (payload.type === 'down' && item.quantity - payload.quantity === 0) {
        const indexOfItem = state.products.items.findIndex(
          (item) => item.id === payload.id
        );
        newItems.splice(indexOfItem, 1);
      } else {
        newItems = state.products.items.map((item) =>
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
      const lineItems = newItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity
      }));
      newSubtotal =
        payload.type === 'up'
          ? state.products.subTotal + payload.quantity * item.price
          : state.products.subTotal - payload.quantity * item.price;
      newCount =
        payload.type === 'up'
          ? state.products.count + payload.quantity
          : state.products.count - payload.quantity;

      newTotal =
        payload.type === 'up'
          ? state.total + payload.quantity * item.price
          : state.total - payload.quantity * item.price;
      return {
        ...state,
        products: {
          items: newItems,
          subTotal: newSubtotal,
          count: newCount
        },
        order: {
          ...state.order,
          line_items: [...lineItems]
        },
        total: newTotal
      };
    }
    case LOAD_CART: {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};

      //   if (!isEmpty(cart)) {
      //     Object.keys(cart).forEach((key) => {
      //       state = {
      //         ...state,
      //         [key]: cart[key]
      //       };
      //     });
      //   }
      return state;
    }
    case UPDATE_PRICE_ON_CART: {
      const { payload } = action;

      if (payload.type === 'removeCode') {
        if (state.promotionCode === payload.couponCode) {
          const valueCode = Number(state.discountValue);
          state = {
            ...state,
            discountType: '',
            discountValue: 0,
            promotionCode: '',
            total: state.total + valueCode,
            hasPromotion: false
          };
        }
      }
      if (payload.type === 'addCode') {
        state = {
          ...state,
          discountType: payload.discountType,
          discountValue: payload.discountValue,
          promotionCode: payload.couponCode,
          total: state.total - payload.discountValue,
          hasPromotion: true
        };
      }
      return state;
    }
    case CHANGE_PAYMENT_METHOD: {
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload
        }
      };
    }
    case UPDATE_PAYMENT_INFOR: {
      const { key, value } = action.payload;
      let keys = key.split('.');
      if (keys.length === 2) {
        state = {
          ...state,
          order: {
            ...state.order,
            [keys[0]]: {
              ...state.order[keys[0]],
              [keys[1]]: value
            }
          }
        };
      } else {
        state = {
          ...state,
          order: {
            ...state.order,
            [key]: value
          }
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export { bookingState };
export default bookingReducer;
