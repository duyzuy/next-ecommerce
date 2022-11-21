import { wcApi } from '../../../../api/woo';

const handleUpdateCustomer = async (req, res) => {
  const { query, body } = req;

  const { id } = query;
  console.log(req);
  await wcApi
    .put(`customers/${id}`, {
      ...body
    })
    .then((response) => {
      console.log(response);
      res.status(200).json({
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export default handleUpdateCustomer;
