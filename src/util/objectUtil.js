import _ from 'lodash';

export const camelCase = obj => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      return {
        ...result,
        [_.camelCase(key)]: camelCase(obj[key]),
      };
    }, {});
  }
  return obj;
};

export const snakeCase = obj => {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      return {
        ...result,
        [_.snakeCase(key)]: snakeCase(obj[key]),
      };
    }, {});
  }
  return obj;
};

export const sortByKey = (key, Arr, type) => {
  const sortArr = Arr.sort((prev, cur) => {
    if (prev[key] > cur[key]) return 1;
    if (prev[key] < cur[key]) return -1;
  });
  return type === 'upper' ? sortArr.reverse() : sortArr;
};
