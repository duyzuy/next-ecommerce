import { ADD_TO_CART } from '../constants/actions';

export const addTocart = ({ data, isExistStorage }) => {
  return {
    type: ADD_TO_CART,
    payload: {
      data,
      isExistStorage
    }
  };
};
