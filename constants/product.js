export const queryParams = {
  PAGE: 'page',
  PER_PAGE: 'per_page',
  ORDER: 'order',
  STATUS: 'status',
  ORDER_BY: 'orderby',
  TYPE: 'type',
  ATTRIBUTE: 'attribute',
  ATTRIBUTE_TERM: 'attribute_term',
  ON_SALE: 'on_sale',
  MIN_PRICE: 'min_price',
  MAX_PRICE: 'max_price',
  STOCK_STATUS: 'stock_status',
  FEATURED: 'featured'
};

export const defaultValue = {
  [queryParams.PAGE]: 1,
  [queryParams.PER_PAGE]: 24,
  [queryParams.ORDER]: 'desc' || 'asc',
  [queryParams.STATUS]: 'publish' || 'private' || 'any',
  [queryParams.ORDER_BY]: 'price',
  [queryParams.TYPE]: 'simple',
  [queryParams.ATTRIBUTE]: '',
  [queryParams.ATTRIBUTE_TERM]: '',
  [queryParams.ON_SALE]: false,
  [queryParams.MIN_PRICE]: 0,
  [queryParams.MAX_PRICE]: 999999999,
  [queryParams.STOCK_STATUS]: 'instock' || 'onbackorder' || 'outofstock',
  [queryParams.FEATURED]: false
};
