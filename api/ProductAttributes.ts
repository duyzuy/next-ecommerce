import { wcApi } from './woo';
import { AttributeType } from '../model';
export async function getProductAttributes(): Promise<{
  status: number;
  statusText: string;
  data?: AttributeType[];
}> {
  return await wcApi
    .get(`products/attributes`)
    .then((response) => {
      const data = response.data.map((attr) => ({
        id: attr.id,
        name: attr.name,
        type: attr.type,
        orderBy: attr.order_by,
        hasArchives: attr.has_archives
      }));

      return {
        status: response.status,
        statusText: response.statusText,
        data: data
      };
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
}

export async function getProductAttrTerms(id) {
  return await wcApi
    .get(`products/attributes/${id}/terms`)
    .then((response) => {
      return response.data.map((term) => ({
        id: term.id,
        name: term.name,
        slug: term.slug,
        count: term.count,
        menuOrder: term.menu_order
      }));
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
}
