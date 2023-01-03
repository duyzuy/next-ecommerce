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

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
};

export const getFeeFromShortCode = ({ str, key }) => {
  // const reg = /(max_fee|max_fee|percent\=\"[0-9]*\")/;
  const reg = new RegExp(`(${key}\=\"[0-9]*\")`, 'i');
  const stringData = str.match(reg);

  if (stringData) {
    const val = stringData[0].substring(
      stringData[0].indexOf('"') + 1,
      stringData[0].lastIndexOf('"')
    );

    if (!isNaN(val)) {
      return Number(val);
    }
    return val;
  }

  return null;
};
