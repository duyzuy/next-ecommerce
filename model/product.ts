import { ImageType, ProductAttributeType } from './common';
export interface ProductItemType {
  id?: number;
  name?: string;
  slug?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  status?: string;
  stock_status?: string;
  type?: string;
  attributes?: ProductAttributeType[];
  images?: ImageType[];
  featured?: boolean;
  sku?: string;
  date_on_sale_from?: string | null;
  date_on_sale_from_gmt?: string | null;
  date_on_sale_to?: string | null;
  date_on_sale_to_gmt?: string | null;
  on_sale?: boolean;
  purchasable?: boolean;
  total_sales?: number;
  tags?: [];
}
export interface ProductDetailType extends ProductItemType {
  description?: string;
  rating_count?: number;
  average_rating?: string;
  catalog_visibility?: string;
  virtual?: boolean;
  downloadable?: boolean;
  downloads?: [];
  download_limit?: boolean;
  download_expiry?: boolean;
  external_url?: string;
  tax_status?: string;
  tax_class?: string;
  manage_stock?: boolean;
  purchase_note?: string;
  parent_id?: number;
  upsell_ids?: [];
  cross_sell_ids?: [];
  reviews_allowed?: boolean;
  categories?: [];
  stock_quantity?: number | null;
  backorders_allowed?: boolean;
  backorders: string;
  backordered?: boolean;
  low_stock_amount?: number | null;
  sold_individually?: boolean;
  dimensions?: {};
  has_options?: boolean;
}
