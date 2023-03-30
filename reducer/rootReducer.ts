import { combineReducers } from '../providers/hooks';
import productListReducer, { productListState } from './productList';
import viewOrderReducer, { viewOrderState } from './viewOrder';
import cartReducer, { cartState } from './cart';
import settingReducer, { settingState } from './settingReducer';
import bookingReducer, { bookingState } from './booking';
import userReducer, { userState } from './user';
import deviceReducer, { deviceState } from './device';
import menuReducer, { menuState } from './menu';

export const initialState = {
  productList: productListState,
  viewOrder: viewOrderState,
  user: userState,
  setting: settingState,
  booking: bookingState,
  device: deviceState,
  menu: menuState
};
const rootReducer = combineReducers({
  productList: productListReducer,
  viewOrder: viewOrderReducer,
  user: userReducer,
  setting: settingReducer,
  booking: bookingReducer,
  device: deviceReducer,
  menu: menuReducer
});

export default rootReducer;

export type InitialRootStateType = typeof initialState;

export type ReducerKeys = keyof typeof initialState;
