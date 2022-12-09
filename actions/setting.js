import { client } from '../api/client';

export const loadSetting = async () => {
  return await client
    .get('setting/general')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const loadShipping = async () => {
  return await client
    .get('shipping')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const loadPaymentGateway = async () => {
  return await client
    .get('paymentGateway')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
