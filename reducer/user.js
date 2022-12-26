import {
  UPDATE_USER_INFO,
  LOAD_USER_INFO,
  UPDATE_ACCOUNT_INFO
} from '../constants/actions';

const userState = {
  account: {},
  order: [],
  address: {}
};

const userReducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER_INFO: {
      console.log(action);
      return state;
    }

    default:
      return state;
  }
};

export { userState };
export default userReducer;
