import { combineReducers } from '../providers/hooks';
import productListReducer, { productListState } from './productList';
import viewOrderReducer, { viewOrderState } from './viewOrder';
import cartReducer, { cartState } from './cart';
import settingReducer, { settingState } from './settingReducer';
import toastReducer, { toastState } from './toast';
export const initialState = {
  productList: productListState,
  viewOrder: viewOrderState,
  cart: cartState,
  setting: settingState,
  toast: toastState
};
const rootReducer = combineReducers({
  productList: productListReducer,
  viewOrder: viewOrderReducer,
  cart: cartReducer,
  setting: settingReducer,
  toast: toastReducer
});

export default rootReducer;
