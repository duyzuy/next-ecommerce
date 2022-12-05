import { VIEW_ORDER_DETAIL } from '../constants/actions';
const viewOrderState = {
  orderId: null,
  orderDetail: [],
  isLoading: false
};

const vewOrderReducer = (state, action) => {
  console.log('reducer action...');
  switch (action.type) {
    case VIEW_ORDER_DETAIL:
      {
        state = viewOrderState;
      }
      break;
    default:
      return state;
  }
};

export { viewOrderState, vewOrderReducer };
