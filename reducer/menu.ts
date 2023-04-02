import { FETCH_CATEGORY } from '../constants/actions';
import { AppActionType } from '../contexts';
import { CategoryItemType } from '../model';

export interface MenuDataType {
  categories: CategoryItemType[];
  menuItem: [];
}
export const menuState: MenuDataType = {
  categories: [],
  menuItem: []
};

const menuReducer = (state = menuState, action: AppActionType) => {
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
