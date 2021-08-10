type DeepArray<T> = Array<T | DeepArray<T>>

export default function flat<T>(arr: DeepArray<T>): T[] {
  const result: T[] = [];

  arr.forEach(item => {
    if (Array.isArray(item)) {
      ([] as T[]).push.apply(result, flat(item));
    } else {
      result.push(item);
    }
  });

  return result;
}
