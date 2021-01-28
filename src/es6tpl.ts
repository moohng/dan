/**
 * es6字符串模板替换
 * @param tpl 字符串模板
 * @param options 值对象
 */
export default function es6tpl(tpl: string, options: {
  [key: string]: string;
}): string {
  return tpl.replace(/\$\{(\w+)}/g, (matched, $1) => (options[$1] ?? matched));
}
