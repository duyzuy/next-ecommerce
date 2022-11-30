import { wcApi } from '../../../api/woo';

const orderDetailHandler = async (req, res) => {
  const { query } = req;
  console.log({ req, res });
  await wcApi
    .get(`orders/${query.id}`)
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

export default orderDetailHandler;
