import { POST_STATUS } from './common';
export interface PostItemType {
  id?: number;
  slug?: string;
  status: 'publish' | 'draft' | 'private';
  title?: string;
  thumbnail?: string;
  excerpt?: string;
  createAt?: string;
  author?: string;
  categories?: { [key: string]: any };
  content?: string;
}
export type PostListType = PostItemType[];
