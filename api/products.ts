import { ProductItemType } from '../model';
import { clientWp } from './clientWp';

export const getProductsByCategoryId = async (
  categoryId: number,
  params?: {
    status?: string;
    type?: 'simple' | 'grouped' | 'external' | 'variable';
    page?: number;
    order?: 'asc' | 'desc';
    orderby?: 'price' | 'popularity' | 'rating' | 'title' | 'include' | 'date';
    offset?: number;
    per_page?: number;
  }
): Promise<{
  status: number;
  statusText: string;
  data: {
    products: ProductItemType[];
    totalItems: number;
    totalPage: number;
    page: number;
  };
}> => {
  // https://saigonhomekitchen.vn/wp-json/dv/v1/products?category=17&per_page=60
  return await clientWp
    .get(`dv/v1/products`, {
      body: {
        ...params,
        category: categoryId,
        status: 'publish',
        per_page: (params?.per_page && params.per_page) || 10,
        page: (params?.page && params.page) || 1
      }
    })
    .then((response) => {
      const { data } = response;
      console.log({ data });
      return {
        status: response.status,
        statusText: response.statusText,
        data: {
          page: data.data.page,
          totalPage: data.data.total,
          products: data.data.list,
          totalItems: data.data.total
        }
      };
    })
    .catch((error) => {
      console.log({ error });
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    });
};
