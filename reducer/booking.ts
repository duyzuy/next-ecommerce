import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART,
  UPDATE_CART,
  UPDATE_PRICE_ON_CART,
  ADD_PAYMENT_INFO,
  ADD_SHIPPING_METHOD,
  SELECT_PAYMENT_METHOD,
  UPDATE_PAYMENT_INFOR,
  UPDATE_PAYMENT_TERM,
  UPDATE_SHIPPING_ADDRESS,
  FETCH_ORDER_DETAIL
} from '../constants/actions';
import { ProductItemType } from '../model';

type ProductBookingItemType = Pick<ProductItemType, 'id' | 'price'> & {
  quantity: number;
};
export interface CouponItem {
  id: number;
  code: string;
  discount: number;
  discountTax: string;
}
export interface BookingDataType {
  products: {
    items: ProductBookingItemType[];
    count: number;
    subTotal: number;
  };
  total: number;
  hasPromotion: boolean;
  promotionCode: string;
  discountValue: number;
  shippingCost: number;
  shippingMethod: { [key: string]: any };
  discountType: string;
  paymentMethod: { [key: string]: any };
  isDifferenceShipping: false;
  billing: { [key: string]: any };
  shipping: { [key: string]: any };
  orderInfor: { [key: string]: any };
  isAcceptTerm: boolean;
  coupons: CouponItem[];
}
export const bookingState: BookingDataType = {
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
  shippingMethod: {},
  discountType: '',
  paymentMethod: {},
  isDifferenceShipping: false,
  billing: {},
  shipping: {},
  orderInfor: {},
  isAcceptTerm: false,
  coupons: []
};

const bookingReducer = (
  state = bookingState,
  action: { type: string; payload: { [key: string]: any } }
) => {
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
      totalPrice = payload.price * payload.quantity;
      state = {
        ...state,
        products: {
          items: [...newItems],
          count: state.products.count + payload.quantity,
          subTotal: state.products.subTotal + totalPrice
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
      newSubtotal =
        payload.type === 'up'
          ? state.products.subTotal + payload.quantity * Number(item.price)
          : state.products.subTotal - payload.quantity * Number(item.price);
      newCount =
        payload.type === 'up'
          ? state.products.count + payload.quantity
          : state.products.count - payload.quantity;

      newTotal =
        payload.type === 'up'
          ? state.total + payload.quantity * Number(item.price)
          : state.total - payload.quantity * Number(item.price);
      return {
        ...state,
        products: {
          items: newItems,
          subTotal: newSubtotal,
          count: newCount
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

      if (payload.action === 'removeCode') {
        if (state.promotionCode === payload.couponCode) {
          const valueCode = Number(state.discountValue);
          state = {
            ...state,
            discountType: '',
            discountValue: 0,
            promotionCode: '',
            total: state.total + valueCode,
            hasPromotion: false,
            coupons: []
          };
        }
      }
      if (payload.action === 'addCode') {
        state = {
          ...state,
          discountType: payload.data.discountType,
          discountValue: payload.data.discountValue,
          promotionCode: payload.data.couponCode,
          total: state.total - payload.data.discountValue,
          hasPromotion: true,
          coupons: [
            {
              id: payload.data.id,
              code: payload.data.couponCode,
              discount: payload.data.discountValue,
              discountTax: ''
            }
          ]
        };
      }
      return state;
    }
    case SELECT_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: {
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
          [keys[0]]: {
            ...state[keys[0]],
            [keys[1]]: value
          }
        };
      } else {
        state = {
          ...state,
          [key]: value
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
      return {
        ...state,
        shippingMethod: {
          ...action.payload
        }
      };
    }
    case FETCH_ORDER_DETAIL: {
      return {
        ...state,
        orderInfor: {
          ...action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default bookingReducer;
