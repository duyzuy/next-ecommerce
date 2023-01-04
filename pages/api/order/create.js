import { wcApi } from '../../../api/woo';
import checkAuthenticated from '../../../lib/checkAuthenticated';

const orderDetailHandler = async (req, res) => {
  const { query } = req;
  console.log({ query });
  //   const isAuthenticated = await checkAuthenticated(req, res);

  await wcApi
    .post(`orders`)
    .then((response) => {
      console.log({ response });
      res.status(200).json({
        status: 'oke',
        stattusCode: 200,
        data: response.data
      });
    })
    .catch((error) => {
      res.status(400).json({
        data: error.response.data
      });
      console.log('Response Status:', error.status);
      console.log('Response Headers:', error.headers);
      console.log('Response Data:', error.data);
    });
};

export default orderDetailHandler;
