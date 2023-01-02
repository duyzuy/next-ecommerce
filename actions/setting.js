import { client } from '../api/client';

export const getSetting = async (type) => {
  return await client
    .get(`setting/${type}`)
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const getShipping = async () => {
  return await client
    .get('shipping')
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const getPaymentGateway = async () => {
  return await client
    .get('paymentGateway')
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const getShippingZone = async () => {
  return await client
    .get('shipping/zones')
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const getShippingLocationsByZoneId = async (id) => {
  return await client
    .get(`shipping/zones/${id}/locations`)
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const getShippingMethodsByZoneId = async (id) => {
  return await client
    .get(`shipping/zones/${id}/methods`)
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};
