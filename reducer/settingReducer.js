import {
  LOAD_ECOM_SETTING,
  LOAD_SHIPPING,
  LOADING_PAYMENT_GATEWAY
} from '../constants/actions';
export const settingState = {
  woocommerceShipping: [],
  woocommercePaymentGateWay: []
};

const settingReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ECOM_SETTING: {
      return {
        ...state,
        ...action.payload
      };
    }
    case LOAD_SHIPPING: {
      return {
        ...state,
        woocommerceShipping: [...action.payload]
      };
    }
    case LOADING_PAYMENT_GATEWAY: {
      return {
        ...state,
        woocommercePaymentGateWay: [...action.payload]
      };
    }

    default:
      return state;
  }
};

export default settingReducer;
