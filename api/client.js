const client = async (url, params = {}) => {
  const configs = {
    method: 'POST',
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

  const response = await fetch(url, { ...configs });

  return response.json();
};

export { client };
