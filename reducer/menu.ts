import { FETCH_CATEGORY, FETCH_MENU_LIST } from '../constants/actions';
import { AppActionType } from '../contexts';
import { CategoryItemType, MenuItemType } from '../model';

export interface MenuDataType {
  categories: CategoryItemType[];
  menuItems: MenuItemType[];
}
export const menuState: MenuDataType = {
  categories: [],
  menuItems: []
};

const menuReducer = (state = menuState, action: AppActionType) => {
  switch (action.type) {
    case FETCH_CATEGORY: {
      return {
        ...state,
        categories: [...action.payload.categories]
      };
    }
    case FETCH_MENU_LIST: {
      return {
        ...state,
        menuItems: action.payload.menus
      };
    }
    default:
      return state;
  }
};

export default menuReducer;
