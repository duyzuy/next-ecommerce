import { ADD_TO_CART } from '../constants/actions';

export const addBooking = ({ data }) => {
  return {
    type: ADD_TO_CART,
    payload: {
      ...data
    }
  };
};
