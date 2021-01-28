/**
 * 待编码的字符串
 * @param {string} input 字符串
 */
export default function encode(input: string): string {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return '';
  }
}
