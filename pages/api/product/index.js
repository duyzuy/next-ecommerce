import { wcApi } from '../../../api/woo';

const productHandler = (req, res) => {
  const { perPage } = req?.query || 10;
  const { page } = req?.query || 1;
  wcApi
    .get('products', {
      per_page: perPage,
      page,
      status: 'publish'
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
