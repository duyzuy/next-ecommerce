import { CHANGE_PAGE } from '../constants/actions';
const productListState = {
  catId: null,
  productList: [],
  currentPage: 1,
  isLoading: false
};

const productListReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_PAGE: {
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

export { productListState, productListReducer };
