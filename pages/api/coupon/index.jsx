import { wcApi } from '../../../api/woo';

const handleCoupons = async (req, res) => {
  const { query } = req;

  await wcApi
    .get(`coupons`, {
      code: query.code
    })
    .then((response) => {
      res.status(200).json({
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
    })
    .catch((err) => {
      const { data } = err.response;
      console.log(err);
      res.status(400).json({
        status: data.data.status,
        statusText: data.message,
        data: data.data.details
      });
    });
};

export default handleCoupons;
