import { ImageType } from './image';
export interface CategoryItemType {
  id: number;
  name: string;
  slug: string;
  image: ImageType | null;
  description: string;
  display: 'default' | 'products' | 'subcategories' | 'both';
  parent: number;
  menu_order: number;
  count: number;
}
