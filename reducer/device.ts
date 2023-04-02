import { FETCH_DEVICE_TYPE } from '../constants/actions';
import { AppActionType } from '../contexts';
import { DeviceType } from '../model';

export const deviceState: DeviceType = {
  isAndroid: false,
  isDesktop: false,
  isIos: false,
  isMobile: false
};

const deviceReducer = (state = deviceState, action: AppActionType) => {
  switch (action.type) {
    case FETCH_DEVICE_TYPE: {
      return action.payload.device;
    }
    default:
      return state;
  }
};

export default deviceReducer;
