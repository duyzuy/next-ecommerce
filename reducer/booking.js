import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART,
  UPDATE_CART,
  UPDATE_PRICE_ON_CART,
  ADD_PAYMENT_INFO,
  ADD_SHIPPING_METHOD,
  CHANGE_PAYMENT_METHOD,
  UPDATE_PAYMENT_INFOR,
  UPDATE_PAYMENT_TERM,
  UPDATE_SHIPPING_ADDRESS
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
  shippingCost: 0,
  discountType: '',
  orderInfor: {
    paymentMethod: 'bacs',
    paymentMethodTitle: 'Chuyển khoản ngân hàng',
    isDifferenceShipping: false,
    billing: {},
    shipping: {},
    lineItems: [],
    shippingLines: [],
    couponLines: [],
    taxLines: [],
    feeLines: []
  },
  isAcceptTerm: false
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
        orderInfor: {
          ...state.orderInfor,
          lineItems: [...lineItems]
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
        orderInfor: {
          ...state.orderInfor,
          lineItems: [...lineItems]
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
            hasPromotion: false,
            orderInfor: {
              ...state.orderInfor,
              couponLines: []
            }
          };
        }
      }
      if (payload.type === 'addCode') {
        state = {
          ...state,
          discountType: payload.data.discountType,
          discountValue: payload.data.discountValue,
          promotionCode: payload.data.couponCode,
          total: state.total - payload.data.discountValue,
          hasPromotion: true,
          orderInfor: {
            ...state.orderInfor,
            couponLines: [
              {
                id: payload.data.id,
                code: payload.data.couponCode,
                discount: payload.data.discountValue,
                discountTax: ''
              }
            ]
          }
        };
      }
      return state;
    }
    case CHANGE_PAYMENT_METHOD: {
      return {
        ...state,
        orderInfor: {
          ...state.orderInfor,
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
          orderInfor: {
            ...state.orderInfor,
            [keys[0]]: {
              ...state.orderInfor[keys[0]],
              [keys[1]]: value
            }
          }
        };
      } else {
        state = {
          ...state,
          orderInfor: {
            ...state.orderInfor,
            [key]: value
          }
        };
      }
      return state;
    }
    case UPDATE_SHIPPING_ADDRESS: {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value
      };
    }
    case UPDATE_PAYMENT_TERM: {
      const data = action.payload;
      return {
        ...state,
        isAcceptTerm: data.isAcceptTerm
      };
    }
    case ADD_SHIPPING_METHOD: {
      const data = action.payload;
      return {
        ...state,
        orderInfor: {
          ...state.orderInfor,
          shippingLines: [
            {
              methodId: data.method_id,
              methodTitle: data.method_title,
              total: data.total
            }
          ],
          shippingMethod: {
            ...data
          }
        }
      };
    }
    default:
      return state;
  }
};

export { bookingState };
export default bookingReducer;
