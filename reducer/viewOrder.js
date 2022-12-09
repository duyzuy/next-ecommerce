import { VIEW_ORDER_DETAIL } from '../constants/actions';
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
