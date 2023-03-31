import { ImageType } from './common';
export interface CategoryItemType {
  count: number;
  description: string;
  display: string;
  id: number;
  image: ImageType | null;
  parent: number;
  slug: string;
  name: string;
}
