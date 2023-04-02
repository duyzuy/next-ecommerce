import { ProductItemType } from './product';

export type BreadcrumbItemType = {
  id?: string;
  path?: string;
  name?: string;
  current?: boolean;
};

export interface ImageType {
  alt?: string;
  date_created?: string;
  date_created_gmt?: string;
  id?: number;
  name?: string;
  src?: string;
}

export interface ProductAttributeType {
  id?: number;
  name?: string;
  options?: string[];
  position?: number;
  variation?: boolean;
  visible?: boolean;
}
export interface DeviceType {
  isAndroid: boolean;
  isDesktop: boolean;
  isIos: boolean;
  isMobile: boolean;
}

export interface ProductsType {
  data: ProductItemType[];
  page: number;
  totalItems: number;
  totalPage: number;
}
export interface AttributeType {
  id: number;
  name: string;
  type: string;
  orderBy: string;
  hasArchives: boolean;
}

export interface BrandItemType {
  id: number;
  name: string;
  src: string;
  path: string;
}

export interface SliderItem {
  id: number;
  title: string;
  excerpt: string;
  bannerLink: string;
  thumbnail: string;
}
