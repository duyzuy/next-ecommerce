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
