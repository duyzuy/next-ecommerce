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
        delete response.data[0].meta_data;
        delete response.data[0]._links;
        delete response.data[0].date_created;
        delete response.data[0].date_created_gmt;
        delete response.data[0].date_modified;
        delete response.data[0].date_modified_gmt;
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

export const getOrders = async (payload) => {
  return await wcApi
    .get('orders', {
      ...payload
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
