export const transformKeys = (input) => {
  return input?.map(obj => {
    const transformed = {};
    for (const key in obj) {
      const newKey = key.split('.')[1];
      transformed[newKey] = obj[key];
    }
    return transformed;
  });
}

export function convertKeyToNumber(input, keyName) {
    return input?.map(obj => {
      const transformed = { ...obj };
      const value = transformed[keyName];
      const num = Number(value);
      if (typeof value === 'string' && !isNaN(num)) {
        transformed[keyName] = num;
      }
      return transformed;
    });
  }

 export function formatToIndianNumbering(value, toFixed = 0, space = false, ) {
    if (value >= 1e7) {
      return `${(value / 1e7)?.toFixed(toFixed)}${space ? " Cr" : "Cr"}`;
    } else if (value >= 1e5) {
      return `${(value / 1e5)?.toFixed(toFixed)}${space ? " L" : "L"}`;
    } else if (value >= 1e3) {
      return `${(value / 1e3)?.toFixed(toFixed)}${space ? " K" : "K"}`;
    }
    return value?.toString();
  }