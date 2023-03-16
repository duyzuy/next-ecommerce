import { wcApi } from './woo';
export const getCategories = async (params) => {
  return await wcApi
    .get(`products/categories`, {
      ...params
    })
    .then((response) => {
      const data = response.data.map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        image: cat.image,
        name: cat.name
      }));

      return {
        status: response.status,
        statusText: response.statusText,
        data: data
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

export const getCategory = async (url, params) => {
  const category = await wcApi
    .get(url, { ...params })
    .then((res) => res.data)
    .catch((error) => error.data);

  return category;
};

export const getProductListByCatId = async (catId, params) => {
  return await wcApi
    .get(`products`, {
      ...params,
      page: (params.page && params.page) || 1,
      category: catId
    })
    .then((res) => {
      const prds = res.data.map((prd) => ({
        id: prd.id,
        name: prd.name,
        slug: prd.slug,
        type: prd.type,
        status: prd.status,
        price: prd.price,
        regular_price: prd.regular_price,
        sale_price: prd.sale_price,
        average_rating: prd.average_rating,
        images: prd.images,
        attributes: prd.attributes,
        stock_status: prd.stock_status
      }));
      return {
        data: prds,
        totalItems: res.headers['x-wp-total'],
        totalPage: res.headers['x-wp-totalpages'],
        page: (params.page && params.page) || 1
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

export const getProductIdsByCatId = async (catId, queryObject) => {
  return await wcApi
    .get(`products`, {
      ...queryObject,
      category: catId
    })
    .then((res) => {
      const prds = res.data.map((prd) => ({
        id: prd.id
      }));
      return {
        data: prds,
        totalItems: res.headers['x-wp-total'],
        totalPage: res.headers['x-wp-totalpages']
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

export const getCategoryBySlug = async (slug) => {
  return await wcApi
    .get(`products/categories`, { slug: slug })
    .then((res) => {
      if (res.data.length === 0) {
        return {
          statusCode: 404,
          message: 'cat is not exists'
        };
      }
      return {
        statusCode: res.status,
        data: res.data
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

export const getProductList = async (url, params) => {
  const products = await wcApi
    .get(url, { ...params })
    .then((res) => ({
      data: res.data,
      totalItems: res.headers['x-wp-total'],
      totalPage: res.headers['x-wp-totalpages']
    }))
    .catch((error) => error.response);

  return products;
};

export const getSlugFromProducts = async (url, params) => {
  return await wcApi
    .get(`products`, { ...params })
    .then((res) => {
      const prds = res.data.map((prd) => ({
        id: prd.id,
        slug: prd.slug
      }));
      return {
        data: prds,
        totalItems: res.headers['x-wp-total'],
        totalPage: res.headers['x-wp-totalpages']
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

export const getProductByIds = async (ids) => {
  const products = await wcApi
    .get('products', { include: [...ids] })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data);

  return products;
};

export const getProductBySlug = async (slug) => {
  return await wcApi
    .get(`products`, { slug: slug })
    .then((res) => {
      if (res.data.length === 0) {
        return {
          statusCode: 404,
          data: res.data,
          message: 'no product found'
        };
      }

      return {
        statusCode: res.status,
        data: res.data[0]
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

export const getReviewsByProductId = async (
  productId,
  params = { perPage: 6, page: 1, status: 'approved' }
) => {
  let queryParams = {
    product: productId,
    per_page: params.perPage,
    page: params.page,
    status: params.status
  };
  const productReviews = await wcApi
    .get(`products/reviews`, { ...queryParams })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return {
    reviews: productReviews,
    ...params
  };
};

export const getProductsByIds = async (ids) => {
  return await wcApi
    .get('products', { include: [...ids] })
    .then((res) => {
      const prds = res.data.map((prd) => ({
        id: prd.id,
        name: prd.name,
        slug: prd.slug,
        type: prd.type,
        status: prd.status,
        price: prd.price,
        regular_price: prd.regular_price,
        sale_price: prd.sale_price,
        average_rating: prd.average_rating,
        images: prd.images,
        attributes: prd.attributes,
        stock_status: prd.stock_status
      }));
      return prds;
    })
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    });
};

export const getHomePageContent = async (url, params) => {};

export const createProductReview = async (prdId, data) => {
  return await wcApi
    .post(`products/reviews`, {
      product_id: prdId,
      ...data
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    });
};

export const getProductCategoryDetail = async (catId) => {
  return await wcApi
    .get(`products/categories/${catId}`)
    .then((res) => ({
      status: res.status,
      data: {
        id: res.data.id,
        image: {
          src: res.data.image.src,
          name: res.data.image.name,
          alt: res.data.image.alt
        },
        name: res.data.name,
        slug: res.data.slug,
        count: res.data.count
      }
    }))
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    });
};
