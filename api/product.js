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

export const getProductByCategory = async (slug, queryObject) => {
  const category = await wcApi
    .get(`products/categories`, { slug: slug })
    .then((res) => res.data[0])
    .catch((error) => error.data);

  const products = await wcApi
    .get(`products`, {
      ...queryObject,
      category: category.id
    })
    .then((res) => ({
      data: res.data,
      totalItems: res.headers['x-wp-total'],
      totalPage: res.headers['x-wp-totalpages']
    }))
    .catch((error) => error.data);

  return {
    category: category,
    products: products
  };
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

export const getProductByIds = async (ids) => {
  const products = await wcApi
    .get('products', { include: [...ids] })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.data);

  return products;
};

export const getProductDetail = async (params) => {
  const productDetail = await wcApi
    .get(`products`, { ...params })
    .then((res) => res.data[0])
    .catch((error) => error.data);

  const { id } = productDetail;

  const productReviews = await wcApi
    .get(`products/reviews`, {
      product: id,
      // status: 'approved',
      orderby: 'date',
      per_page: 24
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.data;
    });

  return {
    product: productDetail,
    review: productReviews
  };
};

export const getProductsByIds = async (ids) => {
  const products = await wcApi
    .get('products', { include: [...ids] })
    .then((res) => res.data)
    .catch((error) => error.data);

  return products;
};

export const getHomePageContent = async (url, params) => {};

export const createProductReview = async (prdId, data) => {
  const response = await wcApi
    .post(`products/reviews`, {
      product_id: prdId,
      ...data
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return response;
};
