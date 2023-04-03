import { wpClient } from './client';

export const getMenuList = async (menuId: number) => {
  return await wpClient
    .get(`dv/v1/menu?menu_id=${menuId}`)
    .then((response) => {
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    });
};
