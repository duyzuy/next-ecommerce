import { CategoryItemType } from './category';
import { ProductAttributeType } from './common';
import { ImageType } from './image';

type ProductDownLoadType = {
  id: string;
  name: string;
  file: string;
};
type DimensionsType = {
  length: string;
  width: string;
  height: string;
};
type ProductCategoryType = {
  id: number;
  name: string;
  slug: string;
};
type ProductTagType = {
  id: number;
  name: string;
  slug: string;
};

export interface ProductItemType {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  status: 'draft' | 'pending' | 'private' | 'publish';
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  type: 'simple' | 'grouped' | 'external' | 'variable';
  attributes: ProductAttributeType[];
  images: ImageType[] | boolean;
  thumbnail: string;
  featured: boolean;
  sku: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  total_sales: number;
  categories: ProductCategoryType[] | [];
}
export interface ProductDetailType extends ProductItemType {
  tags: ProductTagType[] | [];
  description: string;
  rating_count: number;
  average_rating: string;
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
  virtual: boolean;
  downloadable: boolean;
  downloads: [];
  download_limit: boolean;
  download_expiry: boolean;
  external_url: string;
  tax_status: 'taxable' | 'shipping' | 'none';
  tax_class: string;
  manage_stock: boolean;
  purchase_note: string;
  parent_id: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  reviews_allowed: boolean;
  purchasable: boolean;
  stock_quantity: number | null;
  backorders_allowed: boolean;
  backorders: 'no' | 'notify' | 'yes';
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  menu_order: number;
  dimensions: DimensionsType;
  has_options: boolean;
}

export interface ReviewType {
  id: number;
  date_created: string;
  date_created_gmt: string;
  product_id: number;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
}
