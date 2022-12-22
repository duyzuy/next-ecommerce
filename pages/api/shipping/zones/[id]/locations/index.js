import { wcApi } from '../../../../../../api/woo';

const settingHandler = async (req, res) => {
  const { id } = req.query;
  console.log(req);
  await wcApi
    .get(`shipping/zones/${id}/locations`)
    .then((response) => {
      console.log(response);
      res.status(200).json({
        data: response.data
      });
    })
    .catch((error) => {
      console.log(error);
      console.log('Response Status:', error.status);
      console.log('Response Headers:', error.headers);
      console.log('Response Data:', error.data);
    });
};

export default settingHandler;
