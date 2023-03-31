import { VIEW_ORDER_DETAIL } from '../constants/actions';

export interface ViewOrderType {
  orderId: number;
  orderDetail: [];
  isLoading: boolean;
}
const viewOrderState = {
  orderId: null,
  orderDetail: [],
  isLoading: false
};

const viewOrderReducer = (state, action) => {
  switch (action.type) {
    case VIEW_ORDER_DETAIL: {
      const newState = {
        ...state,
        ...action.payload
      };
      return newState;
    }
    default:
      return state;
  }
};

export { viewOrderState };
export default viewOrderReducer;
