/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['saigonhomekitchen.vn']
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['vi-VN'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'vi-VN'
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US'
    //   },
    //   {
    //     domain: 'example.nl',
    //     defaultLocale: 'nl-NL'
    //   },
    //   {
    //     domain: 'example.fr',
    //     defaultLocale: 'fr',
    //     // an optional http field can also be used to test
    //     // locale domains locally with http instead of https
    //     http: true
    //   }
    // ]
  },
  experimental: {
    allowMiddlewareResponseBody: true
  },
  env: {
    WC_CLIENT_URL: 'https://saigonhomekitchen.vn',
    WC_CLIENT_CUSTOMER_KEY: 'ck_da1d62166de972a98bfdb51ba1fc4e23230bd8df',
    WC_CLIENT_CUSTOMER_SECRET_KEY:
      'cs_0852fcce10fac6166d107e63a4561aee11b2020b',
    BASE_API_URL: 'http://localhost:3000/api',
    SKIP_BUILD_STATIC_GENERATION: false
  }
};

module.exports = nextConfig;
