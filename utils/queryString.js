export const updateQueryFromString = (queryString, { key, value }) => {
  const querySearchKey = [`?${key}=`, `&${key}=`];

  const expWithValue = `(\\?${key}=|\\&${key}=)+[0-9]*`;
  const expNoValue = `(\\?${key}=|\\&${key}=)`;

  const regexWithValue = new RegExp(expWithValue, 'g');
  const regexNoValue = new RegExp(expNoValue, 'g');
  const resultValue = queryString.match(regexWithValue);
  const resultNoValue = queryString.match(regexNoValue);

  let updateQueryString = queryString;
  resultValue.forEach((keyVal, index) => {
    updateQueryString = updateQueryString.replace(
      keyVal,
      `${resultNoValue[index]}${value}`
    );
  });

  return updateQueryString;
};
