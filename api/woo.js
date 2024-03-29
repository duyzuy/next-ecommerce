import Woocommerce from '@woocommerce/woocommerce-rest-api';

const wcApi = new Woocommerce({
  url: process.env.WC_CLIENT_URL || 'https://saigonhomekitchen.vn',
  consumerKey:
    process.env.WC_CLIENT_CUSTOMER_KEY ||
    'ck_da1d62166de972a98bfdb51ba1fc4e23230bd8df',
  consumerSecret:
    process.env.WC_CLIENT_CUSTOMER_SECRET_KEY ||
    'cs_0852fcce10fac6166d107e63a4561aee11b2020b',
  version: 'wc/v3'
});

export { wcApi };
