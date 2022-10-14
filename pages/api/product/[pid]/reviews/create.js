import { wcApi } from '../../../../../api/woo';

const createProductReviewsHandle = async (req, res) => {
  const query = req.query;
  console.log(query);
  let queryParams = {
    review: query.review,
    reviewer: query.reviewer,
    rating: Number(query.rating),
    reviewer_email: query.reviewer_email
  };

  await wcApi
    .post(`products/reviews`, {
      product_id: Number(query.pid),
      ...queryParams
    })
    .then((response) => {
      res.status(200).json({
        data: response.data,
        statusCode: response.status,
        statusText: response.statusText
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default createProductReviewsHandle;
