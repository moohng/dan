import Result from './Result'

/**
 * 校验函数
 * @param {Object} 要校验的目标对象（包含需要校验的属性值）
 * @param {Object} 校验规则
 * @returns {Object} 校验的结果
 * 校验规则模板:
 * const rules = {
 *   name: {
 *     alias: 'key的别名，比如：姓名',                   -------- 若无，则默认为key值
 *     required: '为空时要提示的字符串或true(必填)',      -------- 为true则提示默认文字，为字符串时则提示该字符串
 *     pattern: /这里是正则表达式/,                      -------- 正则匹配校验
 *     validate: '自定义校验函数(参数1：当前值，参数2：所有值的对象)'
 *                                                      -------- 返回 true 则校验通过，false 校验不通过（若返回字符串表示校验"不通过"，并且作为提示信息）
 *     message: '校验不通过的提示文字'                    -------- 校验不通过的提示文字，若无则提示默认文字
 *     trim: @Boolean,默认true                          --------- 是否去掉字符串的首尾空格
 *   },
 *   mobile: { ... }
 * }
 * 校验结果模板:
 * const result = { name: '姓名不能为空', mobile: '手机号码输入不正确' };
 * result.hasError（）  // 校验是否出错
 * result.first()       // 获取检验结果的第一个错误提示字符串    ------ 若带参数：指定第几个
 * result.firstKey()    // 获取校验结果的第一个错误字段的key值   ------ 若带参数：指定第几个
 */
export function validator(target, rules) {
  const ruleKeys = rules ? Object.keys(rules) : []
  if (!ruleKeys.length) return new Result()
  const results = ruleKeys.reduce((errors, key) => {
    let value = target[key]
    let tips = null
    const { required, pattern, validate, alias = key, message = `请输入正确的${alias}`, trim = true } = rules[key] || {}
    // 去掉字符串首位空格
    trim && typeof value === 'string' && (value = value.trim())
    if (typeof value === undefined || value === null || !value.length || JSON.stringify(value) === '{}') {
      required && (tips = typeof required === 'string' ? required : `请输入${alias}`)
    } else if (pattern && pattern instanceof RegExp && !pattern.test(value)) { // 正则校验
      tips = message
    } else if (typeof validate === 'function') { // 自定义校验函数
      const res = validate(value, target)
      tips = typeof res === 'string' ? res : (!res ? message : null)
    }
    return tips ? { ...errors, [key]: tips } : { ...errors }
  }, {})
  return new Result(results)
}
