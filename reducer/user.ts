import { UPDATE_USER_DATA, FETCH_USER_DATA } from '../constants/actions';

export interface UserDataType {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  isPaying: false;
  userId: 0;
  role: string;
  userName: string;
  billing: {};
  shipping: {};
}
export const userState: UserDataType = {
  firstName: '',
  lastName: '',
  email: '',
  avatarUrl: '',
  isPaying: false,
  userId: 0,
  role: '',
  userName: '',
  billing: {},
  shipping: {}
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA: {
      const data = action.payload;
      console.log({ data });
      return {
        ...data,
        firstName: data.first_name,
        lastName: data.last_name,
        avatarUrl: data.avatar_url,
        isPayingCustomer: data.is_paying_customer,
        userId: data.id,
        userName: data.username,
        billing: {
          ...data.billing,
          address1: data.billing.address_1,
          address2: data.billing.address_2,
          firstName: data.billing.first_name,
          lastName: data.billing.last_name
        },
        shipping: {
          ...data.shipping,
          address1: data.shipping.address_1,
          address2: data.shipping.address_2,
          firstName: data.shipping.first_name,
          lastName: data.shipping.last_name
        }
      };
    }
    case UPDATE_USER_DATA: {
      const userData = action.payload;
      const { type, data } = userData;

      switch (type) {
        case 'account': {
          state = {
            ...state,
            firstName: data.first_name,
            lastName: data.last_name
          };
          break;
        }
        case 'billing': {
          state = {
            ...state,
            billing: {
              ...data.billing,
              address1: data.billing.address_1,
              address2: data.billing.address_2,
              firstName: data.billing.first_name,
              lastName: data.billing.last_name
            }
          };
          break;
        }
        case 'shipping': {
          state = {
            ...state,
            shipping: {
              ...data.shipping,
              address1: data.shipping.address_1,
              address2: data.shipping.address_2,
              firstName: data.shipping.first_name,
              lastName: data.shipping.last_name
            }
          };
          break;
        }
      }

      return state;
    }
    default:
      return state;
  }
};

export default userReducer;
