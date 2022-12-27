import { wcApi } from '../../../../api/woo';

const handleUpdateCustomer = async (req, res) => {
  const { query, body } = req;
  console.log(body);
  const { id } = query;

  await wcApi
    .put(`customers/${id}`, {
      ...body
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
      res.status(400).json({
        status: data.data.status,
        statusText: data.message,
        data: data.data.details
      });
    });
};

export default handleUpdateCustomer;
