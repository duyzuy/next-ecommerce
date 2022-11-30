import { wcApi } from '../../../../api/woo';

const handleCategoryById = async (req, res) => {
  const { query } = req;
  console.log({ req });
  const cat = await wcApi
    .get(`products/categories/${query.cateId}`)
    .then((response) => {
      if (response.status === 200) {
        getProductData(query, response.data, res);
      }
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data
      };
    });
};

const getProductData = async (query, cat, res) => {
  await wcApi
    .get(`products`, {
      category: query.cateId,
      per_page: (query.perPage && query.perPage) || 10,
      page: (query.page && query.page) || 1
    })
    .then((response) => {
      res.status(200).json({
        id: cat.id,
        image: cat.image,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
        lists: {
          data: response.data,
          total: response.headers['x-wp-total'],
          totalPages: response.headers['x-wp-totalpages'],
          page: (query.page && query.page) || 1
        }
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};
export default handleCategoryById;
