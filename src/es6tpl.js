/**
 * es6字符串模板替换
 * @param {String} tpl 字符串模板
 * @param {Object} options 值对象
 */
export default function es6tpl(tpl, options) {
  return tpl.replace(/\$\{(\w+)}/g, (matched, $1) => (options[$1] ?? matched))
}
