import { wcApi } from '../../../../../api/woo';

const productReviewsHandle = async (req, res) => {
  const query = req.query;
  let queryParams = {
    per_page: query.perPage,
    page: query.page || 1,
    status: query.status || 'approved'
  };

  await wcApi
    .get(`products/reviews`, {
      product: Number(query.pid),
      ...queryParams
    })
    .then((response) => {
      res.status(200).json({
        data: response.data,
        perPage: Number(query.perPage)
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default productReviewsHandle;
