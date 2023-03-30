import { FETCH_DEVICE_TYPE } from '../constants/actions';
import { ActionType } from '../contexts';
import { DeviceType } from '../model';

export const deviceState: DeviceType = {
  isAndroid: false,
  isDesktop: false,
  isIos: false,
  isMobile: false
};

const deviceReducer = (state = deviceState, action: ActionType) => {
  switch (action.type) {
    case FETCH_DEVICE_TYPE: {
      return {
        ...state,
        device: { ...action.payload }
      };
    }
    default:
      return state;
  }
};

export default deviceReducer;
