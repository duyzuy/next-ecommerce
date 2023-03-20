import { isEmpty } from '../utils/helper';
import { objectToQueryString } from '../utils/helper';
const API_URL = 'http://localhost:3000/api';

const client = async (url, params = {}, method) => {
  const configs = {
    method: method ? method : 'POST',
    // mode: 'cors',
    cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer'
  };
  if (!isEmpty(params) && method === 'POST') {
    configs.body = JSON.stringify({ ...params });
  }

  let queryString = '';
  if (!isEmpty(params) && method === 'GET') {
    queryString = objectToQueryString(params);
  }

  const baseUrl = API_URL + '/' + url + queryString;

  const response = await fetch(baseUrl, { ...configs });

  return response.json();
};

client.get = async (url, params = {}) => {
  return await client(url, params, 'GET');
};
client.post = (url, params) => {
  return client(url, params, 'POST');
};
client.put = (url, params) => {
  return client(url, params, 'PUT');
};

const wpClient = async (url, options = {}, method) => {
  const configs = {
    method: method ? method : 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { body, headers } = options;
  if (headers && !isEmpty(headers)) {
    configs.headers = {
      ...configs.headers,
      ...headers
    };
  }
  if (body && method === 'POST') {
    configs.body = JSON.stringify({ ...body });
  }
  let queryString = '';
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

wpClient.get = async (url, options = { body: {}, header: {} }) => {
  return await wpClient(url, options, 'GET');
};
wpClient.post = (url, options = { body: {}, header: {} }) => {
  return wpClient(url, options, 'POST');
};

export { client, wpClient };
