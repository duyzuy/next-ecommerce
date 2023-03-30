import { FETCH_CATEGORY } from '../constants/actions';
import { ActionType } from '../contexts';

export interface MenuDataType {
  categories: [];
  menuItem: [];
}
export const menuState: MenuDataType = {
  categories: [],
  menuItem: []
};

const menuReducer = (state = menuState, action: ActionType) => {
  switch (action.type) {
    case FETCH_CATEGORY: {
      return {
        ...state,
        categories: [...action.payload.categories]
      };
    }
    default:
      return state;
  }
};

export default menuReducer;
