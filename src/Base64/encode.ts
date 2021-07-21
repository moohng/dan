import encodeURL from '../encode';

/**
 * 字符串转Base64
 * @param input 输入字符串
 * @returns Base64码
 */
export default function encode(input: string): string {
  if (typeof window === 'undefined') {
    throw new Error('请在浏览器环境运行');
  }
  return btoa(encodeURL(input));
}
