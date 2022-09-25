import { wcApi } from '../../../api/woo';

const singleProductHandler = (req, res) => {
  const { pId } = req.query;
  wcApi
    .get(`products/${pId}`)
    .then((response) => {
      res.status(200).json({
        data: response.data
        // headers: response.headers
      });
    })
    .catch((error) => {
      console.log('Response Status:', error.status);
      console.log('Response Headers:', error.headers);
      console.log('Response Data:', error.data);
    });
};

export default singleProductHandler;
