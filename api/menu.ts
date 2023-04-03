import { wpClient } from './client';

export const getVerticalMenuItem = async () => {
  return await wpClient
    .get(`dv/v1/menu?type=vertical`)
    .then((response) => {
      console.log({ response });
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      };
    })
    .catch((error) => {
      console.log({ error });
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    });
};
