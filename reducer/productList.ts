import {
  CHANGE_PAGE,
  LOAD_LIST_PRODUCT,
  UPDATE_PAGE_LIST_PRODUCT
} from '../constants/actions';
import { ProductItemType } from '../model';

export interface CacheItemType {
  id?: number;
  currentPage?: number;
  pageCache?: number[];
  items?: { [key: string]: ProductItemType[] };
}
export interface DataCacheType {
  lists: CacheItemType[];
  isLoading: boolean;
}
export const productListState: DataCacheType = {
  lists: [],
  isLoading: false
};

const productListReducer = (
  state = productListState,
  action: { type: string; payload: any | null }
) => {
  switch (action.type) {
    case CHANGE_PAGE: {
      const newState = {
        ...state,
        ...action.payload
      };
      return newState;
    }
    case LOAD_LIST_PRODUCT: {
      const existsList = state.lists.find(
        (list) => list.id === action.payload.id
      );

      if (!existsList) {
        state = {
          ...state,
          lists: [
            ...state.lists,
            {
              id: action.payload.id,
              items: {
                [action.payload.page]: [...action.payload.items]
              },
              currentPage: action.payload.page,
              pageCache: [action.payload.page]
            }
          ]
        };
      }

      return state;
    }

    case UPDATE_PAGE_LIST_PRODUCT: {
      const { id, items, page, isCached } = action.payload;

      const updateList = state.lists.find((list) => list.id === id);

      if (!updateList) return state;

      const newList = state.lists.map((list) => {
        if (list.id !== id) return list;

        if (isCached)
          return {
            ...list,
            currentPage: page
          };

        return {
          ...list,
          currentPage: page,
          items: {
            ...list.items,
            [page]: [...items]
          },
          pageCache: [...list.pageCache, page]
        };
      });

      return {
        ...state,
        lists: [...newList]
      };
    }
    default:
      return state;
  }
};

export default productListReducer;
