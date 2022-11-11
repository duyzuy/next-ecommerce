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
      email: email
    })
    .then((response) => {
      return response.data;
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
