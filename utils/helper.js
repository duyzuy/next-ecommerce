export const isExists = (obj, key) => {
  if (typeof obj === 'object') {
    return obj.hasOwnProperty(key);
  }
  // if (key || key !== 'undefine') {
  //   return true;
  // }

  // return false;
};

export const makeArrayFromLength = (length) => {
  if (typeof length !== 'number') return;
  return Array.from({ length }, (_, i) => {
    return i;
  });
};

export const makeArrayFromNumber = (start, end) => {
  if (typeof start !== 'number' || typeof end !== 'number') return;
  if (end < start) return;
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => {
    return start + index;
  });
};

export const isEmpty = (obj) => {
  if (typeof obj === 'object') {
    if (Object.keys(obj).length !== 0) {
      return false;
    }
    return true;
  }
};

export const objectToQueryString = (obj) => {
  if (typeof obj !== 'object') throw new Error(`${obj} must be object`);

  if (isEmpty(obj)) return;
  let string = '';

  Object.keys(obj).forEach((key, index) => {
    string += index === 0 ? '?' : '&';
    string += key + '=' + obj[key];
  });

  return string;
};
