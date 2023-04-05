import { ProductFilterKeys } from '../model';

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

export const defaultQueryParams = {
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
