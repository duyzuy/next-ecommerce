import { wcApi } from './woo';
export const getCategories = async (params) => {
  return await wcApi
    .get(`products/categories`, {
      ...params
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getCategory = async (url, params) => {
  const category = await wcApi
    .get(url, { ...params })
    .then((res) => res.data)
    .catch((error) => error.data);

  return category;
};

export const getProductByCategory = async (slug, queryObject) => {
  return await wcApi
    .get(`products/categories`, { slug: slug })
    .then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        return res.data[0];
        const prods = await getProductOfCatBySlug();
        
      } else {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });

  // const products = await wcApi
  //   .get(`products`, {
  //     ...queryObject,
  //     category: category.id
  //   })
  //   .then((res) => ({
  //     data: res.data,
  //     totalItems: res.headers['x-wp-total'],
  //     totalPage: res.headers['x-wp-totalpages']
  //   }))
  //   .catch((error) => {
  //     console.log(error);
  //     return error.response.data;
  //   });

  // return {
  //   category: category,
  //   products: products
  // };
};
const getProductOfCatBySlug = async () => {
  return await wcApi
  .get(`products`, {
    ...queryObject,
    category: category.id
  })
  .then((res) => ({
    data: res.data,
    totalItems: res.headers['x-wp-total'],
    totalPage: res.headers['x-wp-totalpages']
  }))
  .catch((error) => {
    return error.response;
  });

}

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

  return {
    product: productDetail
  };
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
      return error.data;
    });

  return {
    reviews: productReviews,
    ...params
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

export const getProductByCategoryId = async (
  catId,
  params = { perPage: 16 }
) => {
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
        per_page: params.perPage,
        page: (params.page && params.page) || 1
      })
      .then((res) => {
        return {
          data: res.data,
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

export const getCategires = async (params) => {
  const response = await wcApi
    .get(`products/categories`, {
      ...params
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return response;
};
