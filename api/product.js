import { wcApi } from './woo';
export const getCategories = async (url, params) => {
  const categories = await wcApi
    .get(url, {
      ...params
    })
    .then((response) => response.data)
    .catch((error) => error.data);

  return categories;
};

export const getCategory = async (url, params) => {
  const category = await wcApi
    .get(url, { ...params })
    .then((res) => res.data)
    .catch((error) => error.data);

  return category;
};

export const getProductList = async (url, params) => {
  const products = await wcApi
    .get(url, { ...params })
    .then((res) => ({
      data: res.data,
      totalItems: res.headers['x-wp-total'],
      totalPage: res.headers['x-wp-totalpages']
    }))
    .catch((error) => error.data);

  return products;
};

export const getProductDetail = async (url, params) => {
  const productDetail = await wcApi
    .get(ur, { ...params })
    .then((res) => res.data)
    .catch((error) => error.data);

  return productDetail;
};
