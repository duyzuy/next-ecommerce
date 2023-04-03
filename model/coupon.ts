import { MetaDataType } from './common';
export interface CouponType {
  id: number;
  code: string;
  amount: string; //always be numeric
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_type: 'percent' | 'fixed_cart' | 'fixed_product';
  description: string;
  date_expires: string;
  date_expires_gmt: string;
  usage_count: number;
  individual_use: boolean;
  product_ids: number[];
  excluded_product_ids: number[];
  usage_limit: number;
  usage_limit_per_user: number;
  limit_usage_to_x_items: number;
  free_shipping: boolean;
  product_categories: number[];
  excluded_product_categories: number[];
  exclude_sale_items: boolean;
  minimum_amount: number;
  maximum_amount: number;
  email_restrictions: string[];
  used_by: number[];
  meta_data: MetaDataType[];
}
