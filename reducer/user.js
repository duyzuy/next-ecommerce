import {
  UPDATE_USER_DATA,
  FETCH_USER_DATA,
  UPDATE_ACCOUNT_INFO
} from '../constants/actions';

const userState = {
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

const userReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER_DATA: {
      const data = action.payload;
      return {
        ...state,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        avatarUrl: data.avatar_url,
        isPaying: data.is_paying_customer,
        userId: data.id,
        role: data.role,
        userName: data.username,
        billing: {
          address1: data.billing.address_1,
          address2: data.billing.address_2,
          city: data.billing.city,
          company: data.billing.company,
          country: data.billing.country,
          email: data.billing.email,
          firstName: data.billing.first_name,
          lastName: data.billing.last_name,
          phone: data.billing.phone,
          postcode: data.billing.postcode,
          state: data.billing.state
        },
        shipping: {
          address1: data.shipping.address_1,
          address2: data.shipping.address_2,
          city: data.shipping.city,
          company: data.shipping.company,
          country: data.shipping.country,
          firstName: data.shipping.first_name,
          lastName: data.shipping.last_name,
          phone: data.shipping.phone,
          postcode: data.shipping.postcode,
          state: data.shipping.state
        }
      };
    }
    case UPDATE_USER_DATA: {
      const userData = action.payload;
      const { type, data } = userData;
      console.log(userData);
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
              address1: data.billing.address_1,
              address2: data.billing.address_2,
              city: data.billing.city,
              company: data.billing.company,
              country: data.billing.country,
              email: data.billing.email,
              firstName: data.billing.first_name,
              lastName: data.billing.last_name,
              phone: data.billing.phone,
              postcode: data.billing.postcode,
              state: data.billing.state
            }
          };
          break;
        }
        case 'shipping': {
          state = {
            ...state,
            shipping: {
              address1: data.shipping.address_1,
              address2: data.shipping.address_2,
              city: data.shipping.city,
              company: data.shipping.company,
              country: data.shipping.country,
              firstName: data.shipping.first_name,
              lastName: data.shipping.last_name,
              phone: data.shipping.phone,
              postcode: data.shipping.postcode,
              state: data.shipping.state
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

export { userState };
export default userReducer;
