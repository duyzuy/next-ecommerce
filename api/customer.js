import { wcApi } from './woo';
export const getCustomerInfor = async (id) => {
  return await wcApi
    .get(`customers/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCustomerByEmail = async (email) => {
  return await wcApi
    .get(`customers`, {
      email,
      role: 'all'
    })
    .then((response) => {
      if (response.data.length > 0) {
        return response.data[0];
      } else {
        return {
          status: 404,
          message: 'customer not found'
        };
      }
    })
    .catch((error) => {
      return error.response;
    });
};

export const createCustomer = async (data) => {
  return await wcApi
    .post(`customers`, {
      ...data
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};
