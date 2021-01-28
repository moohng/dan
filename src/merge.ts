type O =  Record<string, unknown>

/**
 * 多个对象合并
 * @param args 待合并的对象
 */
export default function merge(...args: O[]): O {
  const result: O = {};
  function assignValue([key, val]: [string, unknown]) {
    if (Array.isArray(result[key]) && Array.isArray(val)) {
      result[key] = Array.from(new Set((result[key] as unknown[]).concat(val)));
    } else if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key] as O, val as O);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = args.length; i < l; i += 1) {
    Object.entries(args[i]).forEach(assignValue);
  }
  return result;
}
