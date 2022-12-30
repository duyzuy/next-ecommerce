import { wcApi } from '../../../api/woo';

const settingHandler = async (req, res) => {
  const { query } = req;

  await wcApi
    .get(`settings/${query.type}`)
    .then((response) => {
      const data = response.data.reduce((acc, dt) => {
        delete dt._links;
        const key = dt.id.split('_').reduce((acc, string, index) => {
          return (
            acc +
            (index > 0
              ? string.charAt(0).toUpperCase() + string.slice(1)
              : string)
          );
        }, '');
        return {
          ...acc,
          [key]: dt
        };
      }, {});
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
