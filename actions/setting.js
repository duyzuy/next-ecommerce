import { client } from '../api/client';

export const loadSetting = async (type) => {
  return await client
    .get(`setting/${type}`)
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const loadShipping = async () => {
  return await client
    .get('shipping')
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const loadPaymentGateway = async () => {
  return await client
    .get('paymentGateway')
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const loadShippingZone = async () => {
  return await client
    .get('shipping/zones')
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const loadShippingLocationsByZoneId = async (id) => {
  return await client
    .get(`shipping/zones/${id}/locations`)
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};

export const loadShippingMethodsByZoneId = async (id) => {
  return await client
    .get(`shipping/zones/${id}/methods`)
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
};
