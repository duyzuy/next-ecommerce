import { wcApi } from '../../../api/woo';

const productHandler = async (req, res) => {
  const { query } = req;

  await wcApi
    .get('products', {
      ...query
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
