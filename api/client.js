import { isEmpty } from '../utils/helper';
import { objectToQueryString } from '../utils/helper';
const API_URL = 'http://localhost:3000/api';

const client = async (url, params = {}, method) => {
  const configs = {
    method: method ? method : 'POST',
    // mode: 'cors',
    cache: 'no-cache'
    // credentials: 'same-origin',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer'
  };
  // if (!isEmpty(params)) {
  //   configs.body = JSON.stringify({ ...params });
  // }

  let queryString = '';
  if (!isEmpty(params)) {
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
export { client };
