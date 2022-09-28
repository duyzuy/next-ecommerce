import { wcApi } from '../../../api/woo';

const productHandler = (req, res) => {
  const { perPage, page, order, orderby, status } = req?.query;

  wcApi
    .get('products', {
      status: status || 'publish',
      per_page: perPage,
      page,
      orderby,
      order
    })
    .then((response) => {
      res.status(200).json({
        data: response.data,
        totalItems: response.headers['x-wp-total'],
        totalPage: response.headers['x-wp-totalpages']
        // headers: response.headers
      });
    })
    .catch((error) => {
      console.log('Response Status:', error.status);
      console.log('Response Headers:', error.headers);
      console.log('Response Data:', error.data);
    });
};

export default productHandler;
