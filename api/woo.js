import Woocommerce from '@woocommerce/woocommerce-rest-api';

const wcApi = new Woocommerce({
  url: process.env.WC_CLIENT_URL,
  consumerKey: process.env.WC_CLIENT_CUSTOMER_KEY,
  consumerSecret: process.env.WC_CLIENT_CUSTOMER_SECRET_KEY,
  version: 'wc/v3'
});

export { wcApi };
