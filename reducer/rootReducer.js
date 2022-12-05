import { combineReducers } from '../providers/hooks';
import { productListReducer, productListState } from './productList';
import { viewOrderReducer, viewOrderState } from './viewOrder';
import { cartReducer, cartState } from './cart';
export const initialState = {
  productList: productListState,
  viewOrder: viewOrderState,
  cart: cartState
};
const rootReducer = combineReducers({
  productList: productListReducer,
  viewOrder: viewOrderReducer,
  cart: cartReducer
});

export default rootReducer;
