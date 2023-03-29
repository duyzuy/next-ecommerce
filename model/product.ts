import { ImageType, ProductAttributeType } from './common';
export interface ProductItemType {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  status: string;
  stock_status: string;
  type: string;
  attributes: ProductAttributeType[];
  images: ImageType[];
  featured: boolean;
  sku: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  tags: [{ id: number; name: string; slug: string }];
  categories: [{ id: number; name: string; slug: string }];
}
export interface ProductDetailType extends ProductItemType {
  description: string;
  rating_count: number;
  average_rating: string;
  catalog_visibility: string;
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

  stock_quantity: number | null;
  backorders_allowed: boolean;
  backorders: string;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
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
