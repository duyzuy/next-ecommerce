import { ImageType, ProductAttributeType } from './common';
export interface ProductItemType {
  id?: number;
  name?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  slug?: string;
  status?: string;
  stock_status?: string;
  type?: string;
  attributes?: ProductAttributeType[];
  images?: ImageType[];
}
