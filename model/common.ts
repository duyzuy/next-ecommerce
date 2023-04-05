import { ProductItemType } from './product';
export interface MetaDataType {
  id: number;
  key: string;
  value: string;
}
export enum POST_STATUS {
  PUBLISH = 'publish',
  DRAFT = 'draft',
  PRIVATE = 'private'
}
export enum POST_TYPE {
  SIMPLE = 'simple',
  GROUPED = 'grouped',
  EXTERNAL = 'external',
  VARIABLE = 'variable'
}
export enum TAX_STATUS {
  TAXABLE = 'taxable',
  SHIPPING = 'shipping'
}
export enum STOCK_STATUS {
  INSTOCK = 'instock',
  OUT_OF_STOCK = 'outofstock',
  ON_BACK_ORDER = 'onbackorder'
}

export type BreadcrumbItemType = {
  id?: string;
  path?: string;
  name?: string;
  current?: boolean;
};

export interface ProductAttributeType {
  id?: number;
  name?: string;
  options?: string[];
  position?: number;
  variation?: boolean;
  visible?: boolean;
}
export interface DeviceType {
  isAndroid: boolean;
  isDesktop: boolean;
  isIos: boolean;
  isMobile: boolean;
}

export interface ProductsType {
  data: ProductItemType[];
  page: number;
  totalItems: number;
  totalPage: number;
}
export interface AttributeType {
  id: number;
  name: string;
  type: string;
  slug: string;
  orderBy: string;
  hasArchives: boolean;
  options: {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
    count: number;
  }[];
}

export interface BrandItemType {
  id: number;
  name: string;
  src: string;
  path: string;
}

export interface SliderItem {
  id: number;
  title: string;
  excerpt: string;
  bannerLink: string;
  thumbnail: string;
}

export enum ProductFilterKeys {
  PAGE = 'page',
  PER_PAGE = 'per_page',
  ORDER = 'order',
  STATUS = 'status',
  ORDER_BY = 'orderby',
  TYPE = 'type',
  ATTRIBUTE = 'attribute',
  ATTRIBUTE_TERM = 'attribute_term',
  MIN_PRICE = 'min_price',
  MAX_PRICE = 'max_price',
  STOCK_STATUS = 'stock_status',
  FEATURED = 'featured',
  CATEGORY = 'category'
}
