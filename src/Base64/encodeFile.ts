/**
 * Blob文件转Base64
 * @param input 输入
 * @returns Base64
 */
export default function encodeFile(input: Blob): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('请在浏览器环境运行');
  }
  return new Promise((resole, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        resole(e.target?.result as string);
      } else {
        reject(new Error('结果不存在'));
      }
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(input);
  });
}
