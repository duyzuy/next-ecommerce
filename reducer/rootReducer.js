import { combineReducers } from '../providers/hooks';
import productListReducer, { productListState } from './productList';
import viewOrderReducer, { viewOrderState } from './viewOrder';
import cartReducer, { cartState } from './cart';
import settingReducer, { settingState } from './settingReducer';
import bookingReducer, { bookingState } from './booking';
export const initialState = {
  productList: productListState,
  viewOrder: viewOrderState,
  // cart: cartState,
  setting: settingState,
  booking: bookingState
};
const rootReducer = combineReducers({
  productList: productListReducer,
  viewOrder: viewOrderReducer,
  // cart: cartReducer,
  setting: settingReducer,
  booking: bookingReducer
});

export default rootReducer;
