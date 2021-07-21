/**
 * 文件Base64转Blob
 * @param input 输入
 * @param fileType 文件类型
 * @returns 文件Blob
 */
export default function decodeFile(input: string, fileType?: string): Blob {
  if (typeof window === 'undefined') {
    throw new Error('请在浏览器环境运行');
  }
  const arr = input.split(',');
  if (!fileType) {
    fileType = arr[0].match(/:(.*);/)?.[1];
  }
  const data = arr[1];
  const byteChars = atob(data);
  let len = byteChars.length;
  const bytes = new Uint8Array(len);
  while (len--) {
    bytes[len] = byteChars.charCodeAt(len);
  }
  return new Blob([bytes], {
    type: fileType,
  });
}
