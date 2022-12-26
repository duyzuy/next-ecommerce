import { combineReducers } from '../providers/hooks';
import productListReducer, { productListState } from './productList';
import viewOrderReducer, { viewOrderState } from './viewOrder';
import cartReducer, { cartState } from './cart';
import settingReducer, { settingState } from './settingReducer';
import bookingReducer, { bookingState } from './booking';
import userReducer, { userState } from './user';
export const initialState = {
  productList: productListState,
  viewOrder: viewOrderState,
  user: userState,
  setting: settingState,
  booking: bookingState
};
const rootReducer = combineReducers({
  productList: productListReducer,
  viewOrder: viewOrderReducer,
  user: userReducer,
  setting: settingReducer,
  booking: bookingReducer
});

export default rootReducer;
