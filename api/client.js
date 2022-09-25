const client = async (url, params = {}, method) => {
  const configs = {
    method: method ? method : 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ ...params })
  };

  let baseUrl = url;
  if (params !== '') {
    Object.keys(params).forEach((key, index) => {
      baseUrl = baseUrl.concat(
        `${index === 0 ? '?' : '&'}${key}=${params[key]}`
      );
    });
  }

  const response = await fetch(baseUrl, { ...configs });

  return response.json();
};

client.get = async (url, params) => {
  return client(url, { params, method: 'GET' });
};
client.post = async (url, params) => {
  return client(url, { params, method: 'POST' });
};
export { client };
