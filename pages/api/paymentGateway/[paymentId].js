import { wcApi } from '../../../api/woo';

const settingHandler = async (req, res) => {
  const { query } = req;
  await wcApi
    .get(`payment_gateways/${query.paymentId}`)
    .then((response) => {
      console.log(response.data);

      res.status(200).json({
        data: response.data
      });
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json({
        ...error.response
      });
    });
};

export default settingHandler;
