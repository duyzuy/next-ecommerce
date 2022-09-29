import { wcApi } from '../../../api/woo';
import { wooSetting } from '../../../constants/settings';
const settingHandler = async (req, res) => {
  const { query } = req;

  await wcApi
    .get('settings/general')
    .then((response) => {
      let data;
      switch (query?.type) {
        case wooSetting.WOO_CURRENCY: {
          data = response.data.find((seting) => {
            return seting.id === wooSetting.WOO_CURRENCY;
          });

          break;
        }
        default:
          data = response.data;
      }

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
