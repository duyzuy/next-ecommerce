export const productFilterKeys = {
  PAGE: 'page',
  PER_PAGE: 'per_page',
  ORDER: 'order',
  STATUS: 'status',
  ORDER_BY: 'orderby',
  TYPE: 'type',
  ATTRIBUTE: 'attribute',
  ATTRIBUTE_TERM: 'attribute_term',
  // ON_SALE: 'on_sale',
  MIN_PRICE: 'min_price',
  MAX_PRICE: 'max_price',
  STOCK_STATUS: 'stock_status',
  FEATURED: 'featured'
};

export const productFilterValue = {
  [productFilterKeys.PAGE]: 1,
  [productFilterKeys.PER_PAGE]: 24,
  [productFilterKeys.ORDER]: 'desc',
  [productFilterKeys.STATUS]: 'publish',
  [productFilterKeys.ORDER_BY]: 'date',
  [productFilterKeys.TYPE]: 'simple',
  // [productFilterKeys.ATTRIBUTE]: '',
  // [productFilterKeys.ATTRIBUTE_TERM]: '',
  // [productFilterKeys.ON_SALE]: true,
  [productFilterKeys.MIN_PRICE]: 0,
  [productFilterKeys.MAX_PRICE]: 999999999,
  [productFilterKeys.STOCK_STATUS]: 'instock'
  // [productFilterKeys.FEATURED]: false
};
