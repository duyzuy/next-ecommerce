import { clientWp } from './clientWp';
import { PostItemType } from '../model/post';
export const getAllPosts = async (params?: {
  [key: string]: any;
}): Promise<{
  status: number;
  statusText: string;
  data?: {
    posts?: PostItemType[];
    perPage?: number;
    page?: number;
    total?: number;
  };
}> => {
  const { perPage, offset, page } = params || {};

  return await clientWp
    .get(`dv/v1/posts`, {
      body: { per_page: perPage, page: page }
    })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: '',
        data: {}
      };
    });
};

export const getAllPostSlugs = async (params?: {
  [key: string]: any;
}): Promise<{
  status: number;
  statusText: string;
  data?: {
    posts?: PostItemType[];
    perPage?: number;
    page?: number;
    total?: number;
  };
}> => {
  const { perPage, offset, page } = params || {};

  return await clientWp
    .get(`dv/v1/posts`, {
      body: { per_page: perPage, page: page }
    })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: '',
        data: {}
      };
    });
};

export const getPostBySlug = async (
  slug?: string
): Promise<{
  status: number;
  statusText: string;
  data?: {
    [key: string]: any;
  };
}> => {
  return await clientWp
    .get(`dv/v1/posts`, {
      body: { slug: slug }
    })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        statusText: '',
        data: {}
      };
    });
};
