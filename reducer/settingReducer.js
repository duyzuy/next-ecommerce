import {
  LOAD_ECOM_SETTING,
  FETCH_SHIPPING_SETTING,
  FETCH_PAYMENT_GATEWAY_SETTING
} from '../constants/actions';
export const settingState = {
  wcShipping: [],
  wcPaymentGateWay: []
};

const settingReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ECOM_SETTING: {
      const { settingType, settingValue } = action.payload;
      return {
        ...state,
        [settingType]: { ...settingValue }
      };
    }
    case FETCH_SHIPPING_SETTING: {
      return {
        ...state,
        wcShipping: [...action.payload]
      };
    }
    case FETCH_PAYMENT_GATEWAY_SETTING: {
      return {
        ...state,
        wcPaymentGateWay: [...action.payload]
      };
    }

    default:
      return state;
  }
};

export default settingReducer;
