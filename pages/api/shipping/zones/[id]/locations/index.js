import { wcApi } from '../../../../../../api/woo';

const settingHandler = async (req, res) => {
  const { id } = req.query;
  console.log(req);
  await wcApi
    .get(`shipping/zones/${id}/locations`)
    .then((response) => {
      let data = response.data;
      data.map((item) => {
        delete item._links;
        return item;
      });
      res.status(200).json({
        data: data
      });
    })
    .catch((error) => {
      res.status(404).json({
        ...error.response.data
      });
    });
};

export default settingHandler;
