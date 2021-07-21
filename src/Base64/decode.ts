import decodeURL from '../decode';

/**
 * Base64转字符串
 * @param input 输入Base64码
 * @returns 字符串
 */
export default function decode(input: string): string {
  if (typeof window === 'undefined') {
    throw new Error('请在浏览器环境运行');
  }
  return decodeURL(atob(input));
}
