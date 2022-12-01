import { wcApi } from '../../../api/woo';
import checkAuthenticated from '../../../lib/checkAuthenticated';

const orderDetailHandler = async (req, res) => {
  const { query } = req;

  const isAuthenticated = await checkAuthenticated(req, res);

  if (isAuthenticated) {
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
  } else {
    res.status(401).json({
      message: 'you are not allowed'
    });
  }
};

export default orderDetailHandler;
