import { wcApi } from '../../../../api/woo';

const handleCategoryById = async (req, res) => {
  const { query } = req;
  const cat = await wcApi
    .get(`products/categories/${query.cateId}`)
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
        category: query.cateId,
        per_page: (query.perPage && query.perPage) || 10,
        page: (query.page && query.page) || 1
      })
      .then((res) => {
        return {
          data: res.data,
          total: res.headers['x-wp-total'],
          totalPages: res.headers['x-wp-totalpages'],
          page: (query.page && query.page) || 1
        };
      })
      .catch((error) => {
        return error.response.data;
      });

    res.status(200).json({
      id: cat.data.id,
      image: cat.data.image,
      name: cat.data.name,
      slug: cat.data.slug,
      count: cat.data.count,
      lists: prdData
    });
  }

  res.status(200).json({
    status: cat.status,
    data: cat.data
  });
};

export default handleCategoryById;
