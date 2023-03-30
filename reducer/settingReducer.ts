import {
  FETCH_SHIPPING_SETTING,
  FETCH_PAYMENT_GATEWAY_SETTING,
  FETCH_SHIPPING_ZONE_SETTING,
  FETCH_GENERAL_SETTING
} from '../constants/actions';

export interface SettingDataType {
  wcShipping: { [key: string]: any }[];
  wcPaymentGateWay: { [key: string]: any }[];
}
export const settingState: SettingDataType = {
  wcShipping: [],
  wcPaymentGateWay: []
};

const settingReducer = (state = settingState, action) => {
  switch (action.type) {
    case FETCH_GENERAL_SETTING: {
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
    case FETCH_SHIPPING_ZONE_SETTING: {
      return {
        ...state,
        wcShippingZones: [...action.payload]
      };
    }
    default:
      return state;
  }
};

export default settingReducer;
