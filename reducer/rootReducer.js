import { combineReducers } from '../providers/hooks';
import productListReducer, { productListState } from './productList';
import viewOrderReducer, { viewOrderState } from './viewOrder';
import cartReducer, { cartState } from './cart';
import settingReducer, { settingState } from './settingReducer';
export const initialState = {
  productList: productListState,
  viewOrder: viewOrderState,
  cart: cartState,
  setting: settingState
};
const rootReducer = combineReducers({
  productList: productListReducer,
  viewOrder: viewOrderReducer,
  cart: cartReducer,
  setting: settingReducer
});

export default rootReducer;
