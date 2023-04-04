export enum ProductFilterKeys {
  PAGE = 'page',
  PER_PAGE = 'per_page',
  ORDER = 'order',
  STATUS = 'status',
  ORDER_BY = 'orderby',
  TYPE = 'type',
  ATTRIBUTE = 'attribute',
  ATTRIBUTE_TERM = 'attribute_term',
  // ON_SALE = 'on_sale',
  MIN_PRICE = 'min_price',
  MAX_PRICE = 'max_price',
  STOCK_STATUS = 'stock_status',
  FEATURED = 'featured',
  CATEGORY = 'category'
}

export const productFilterValue = {
  [ProductFilterKeys.PAGE]: 1,
  [ProductFilterKeys.PER_PAGE]: 25,
  [ProductFilterKeys.ORDER]: 'desc',
  [ProductFilterKeys.STATUS]: 'publish',
  [ProductFilterKeys.ORDER_BY]: 'date',
  [ProductFilterKeys.TYPE]: 'simple',
  [ProductFilterKeys.MIN_PRICE]: 0,
  [ProductFilterKeys.MAX_PRICE]: 999999999,
  [ProductFilterKeys.STOCK_STATUS]: 'instock',
  [ProductFilterKeys.CATEGORY]: 0
};
