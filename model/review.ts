export interface ReivewItemType {
  id: number;
  date_created: string;
  date_created_gmt: string;
  product_id: number;
  status: 'approved' | 'hold' | 'spam' | 'unspam' | 'trash' | 'untrash';
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
}
