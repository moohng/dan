import unique from './unique';

interface O {
  [key: string]: unknown
}

const isObject = (obj: unknown): boolean => Object.prototype.toString.call(obj) === '[object Object]';

/**
 * 多个对象合并
 * @param args 待合并的对象
 */
export default function merge(...args: O[]): O {
  const result: O = {};

  function assignValue(key: string, val: unknown) {
    if (Array.isArray(result[key]) && Array.isArray(val)) {
      // 数组合并
      result[key] = unique((result[key] as unknown[]).concat(val));
    } else if (isObject(result[key]) && isObject(val)) {
      // 对象继续合并
      result[key] = merge(result[key] as O, val as O);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    const obj = args[i];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        assignValue(key, obj[key]);
      }
    }
  }
  return result;
}
