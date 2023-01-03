export const DOT = '...';
export const paginateAction = {
  NEXT: 'next',
  PREV: 'prev',
  SELECT: 'select'
};

export const contentType = {
  PRODUCT: 'product',
  POST: 'post',
  PAGE: 'page'
};

export const DISCOUNT_TYPE = {
  FIXED_CART: 'fixed_cart',
  PERCENT: 'percent'
};

export const userInfo = {
  userId: 0,
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phone: '',
  role: '',
  country: '',
  city: ''
};
export const billing = {
  firstName: '',
  lastName: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  email: '',
  phone: ''
};
export const shipping = {
  firstName: '',
  lastName: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postcode: '',
  country: ''
};

export const saleAllowedCountryType = {
  ALL: 'all',
  SPECIFIC: 'specific',
  ALL_EXCEPT: 'all_except'
};

export const settingType = {
  PRODUCTS: 'products',
  GENERAL: 'general',
  TAX: 'tax',
  SHIPPING: 'shipping',
  CHECKOUT: 'checkout',
  ACCOUNT: 'account',
  EMAIL: 'email',
  INTEGRATION: 'integration',
  API: 'api',
  EMAIL_NEW_ORDER: 'email_new_order',
  EMAIL_CANCELLED_ORDER: 'email_cancelled_order',
  EMAIL_FAILED_ORDER: 'email_failed_order',
  EMAIL_CUSTOMER_ON_HOLDE_ORDER: 'email_customer_on_hold_order',
  EMAIL_CUSTOMER_PROCESSING_ORDER: 'email_customer_processing_order',
  EMAIL_CUSTOMER_COMPLETED_ORDER: 'email_customer_completed_order',
  EMAIL_CUSTOMER_INVOICE: 'email_customer_invoice',
  EMAIL_CUSTOMER_NOTE: 'email_customer_note',
  EMAIL_CUSTOMER_RESET_PASSWORD: 'email_customer_reset_password',
  EMAIL_CUSTOMER_NEW_ACCOUNT: 'email_customer_new_account'
};

export const shippingMethodType = {
  FLAT_RATE: 'flat_rate',
  LOCAL_PICKUP: 'local_pickup',
  FREE_SHIPPING: 'free_shipping'
};
