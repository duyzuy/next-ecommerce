import { wcApi } from '../../../api/woo';
import { getToken } from 'next-auth/jwt';
const orderDetailHandler = async (req, res) => {
  const { query } = req;
  console.log({ req, res });
  const secret = process.env.SESSION_SECRET;
  const token = await getToken({ req, secret });
  console.log({ token, date: new Date(1669823920000) });

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
