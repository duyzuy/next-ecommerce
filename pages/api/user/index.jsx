import { wcApi } from '../../../api/woo';

export const handleGetUserData = async (req, res) => {
  const { query } = req;
  await wcApi
    .get(`customers`, {
      email: query.email,
      role: 'all'
    })
    .then((response) => {
      console.log(response);
      if (response.data.length > 0) {
        delete response.data[0].meta_data;
        delete response.data[0]._links;
        delete response.data[0].date_created;
        delete response.data[0].date_created_gmt;
        delete response.data[0].date_modified;
        delete response.data[0].date_modified_gmt;
        res.status(200).json({
          data: response.data[0]
        });
      } else {
        res.status(404).json({
          data: 'user not found'
        });
      }
    })
    .catch((error) => {
      return error.response;
    });
};
