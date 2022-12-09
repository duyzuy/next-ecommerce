import { wcApi } from '../../../api/woo';

const settingHandler = async (req, res) => {
  await wcApi
    .get('shipping_methods')
    .then((response) => {
      const data = response.data.map((dt) => {
        delete dt._links;
        return dt;
      });
      res.status(200).json({
        data: data
      });
    })
    .catch((error) => {
      console.log('Response Status:', error.status);
      console.log('Response Headers:', error.headers);
      console.log('Response Data:', error.data);
    });
};

export default settingHandler;
