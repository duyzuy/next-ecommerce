import { wcApi } from '../../../../api/woo';

const singleProductHandler = async (req, res) => {
  const { pid } = req.query;

  await wcApi
    .get(`products/${pid}`)
    .then((response) => {
      res.status(200).json({
        data: response.data
      });
    })
    .catch((error) => {
      console.log('Response Status:', error.status);
      console.log('Response Headers:', error.headers);
      console.log('Response Data:', error.data);
    });
};

export default singleProductHandler;
