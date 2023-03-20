export interface PostItemType {
  id?: number;
  slug?: string;
  title?: string;
  thumbnail?: string;
  excerpt?: string;
  createAt?: string;
  author?: string;
  categories?: { [key: string]: any };
}
export type PostListType = PostItemType[];
