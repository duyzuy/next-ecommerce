import { ADD_TOAST, REMOVE_TOAST } from '../constants/actions';
const toastState = {
  message: [
    {
      content: 'messatge 1',
      type: 'error'
    }
  ]
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case ADD_TOAST: {
      state = {
        ...state,
        message: [...state.message, action.payload]
      };
    }
    default:
      return state;
  }
};

export { toastState };
export default toastReducer;
