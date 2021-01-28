/**
 * 生成随机字符串/数字
 * @param args 1个参数表示生成随机字符串的长度，2个参数表示生成随机数的范围，第三个参数表示随机数是否为整数
 */
export default function random(...args: [number?, number?, boolean?]): string | number {
  if (args.length === 0 || args[0] === 0) {
    return Math.random();
  }
  if (args.length === 1) {
    const length = args[0] as number;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const min = args[0] as number;
  const max = args[1] as number;
  const isInteger = !!args[2];
  const result = Math.random() * Math.abs(max - min) + Math.min(min, max);
  return isInteger ? Math.floor(result) : result;
}
