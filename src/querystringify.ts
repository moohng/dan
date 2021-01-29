import encode from './encode';

interface Query {
  [key: string]: unknown;
}

/**
 * 将query对象转成字符串
 * @param query query对象
 * @param prefix 前缀
 */
export default function querystringify(query: Query, prefix = ''): string {
  const pairs: string[] = [];

  function assign(k: string, v: unknown) {
    if (k !== null && v !== null) {
      pairs.push(`${k}=${v}`);
    }
  }

  Object.keys(query).forEach((key) => {
    let val = query[key];

    if (val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
      val = '';
    }

    key = encode(key);

    if (Array.isArray(val)) {
      val.forEach(v => {
        assign(key, encode(v));
      });
    } else {
      assign(key, encode(String(val)));
    }
  });

  return pairs.length ? prefix + pairs.join('&') : '';
}
