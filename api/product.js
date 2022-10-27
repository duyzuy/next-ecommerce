import { wcApi } from './woo';
export const getCategories = async (params) => {
  return await wcApi
    .get(`products/categories`, {
      ...params
    })
    .then((response) => {
      return response.data.map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        image: cat.image,
        name: cat.name
      }));
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCategory = async (url, params) => {
  const category = await wcApi
    .get(url, { ...params })
    .then((res) => res.data)
    .catch((error) => error.data);

  return category;
};

export const getProductListByCatId = async (catId, queryObject) => {
  return await wcApi
    .get(`products`, {
      ...queryObject,
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
        totalPage: res.headers['x-wp-totalpages']
      };
    })
    .catch((error) => {
      return error.response.data;
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
    .catch((err) => {
      return err.response.data;
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
    .catch((error) => error.response);
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
      console.log(error);
      return error.response.data;
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
  const products = await wcApi
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

export const getProductByCategoryId = async (catId, params) => {
  //check categoryID avaiable

  const cat = await wcApi
    .get(`products/categories/${catId}`)
    .then((res) => {
      return {
        status: res.status,
        data: res.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data
      };
    });

  //get products if category Id exists
  if (cat.status === 200) {
    const prdData = await wcApi
      .get(`products`, {
        category: catId,
        per_page: (params.perPage && params.perPage) || 4,
        page: (params.page && params.page) || 1,
        status: 'publish',
        type: 'simple',
        stock_status: 'instock'
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
          total: res.headers['x-wp-total'],
          totalPages: res.headers['x-wp-totalpages'],
          page: (params.page && params.page) || 1
        };
      })
      .catch((error) => {
        return error.response.data;
      });

    return {
      status: 200,
      id: cat.data.id,
      image: cat.data.image,
      name: cat.data.name,
      slug: cat.data.slug,
      count: cat.data.count,
      lists: prdData
    };
  }

  return {
    status: cat.status,
    data: cat.data
  };
};
