import { isEmpty } from '../utils/helper';
import { objectToQueryString } from '../utils/helper';
const clientWp = async (
  url: string,
  options?: { body?: { [key: string]: any }; headers?: { [key: string]: any } },
  method?: string
) => {
  let configs: {
    method?: string;
    headers?: { [key: string]: any };
    body?: string;
  } = {
    method: method ? method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { body = {}, headers = {} } = options || {};

  if (headers && !isEmpty(headers)) {
    configs = {
      ...configs,
      headers: {
        ...configs.headers,
        ...headers
      }
    };
  }
  if (!isEmpty(body) && method === 'POST') {
    configs = {
      ...configs,
      body: JSON.stringify({ ...body })
    };
  }
  let queryString: string = '';
  if (!isEmpty(body) && method === 'GET') {
    queryString = objectToQueryString(body);
  }
  const baseUrl = `https://saigonhomekitchen.vn/wp-json/` + url + queryString;
  const response = await fetch(baseUrl, { ...configs });

  return {
    status: response.status,
    statusText: response.statusText,
    data: await response.json()
  };
};

clientWp.get = async (
  url: string,
  options?: {
    body?: { [key: string]: any };
    headers?: { [key: string]: any };
  }
) => {
  return await clientWp(url, options, 'GET');
};
clientWp.post = (
  url: string,
  options?: {
    body?: { [key: string]: any };
    headers?: { [key: string]: any };
  }
) => {
  return clientWp(url, options, 'POST');
};

export { clientWp };
