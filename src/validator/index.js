import Errors from './Errors'

/**
 * 校验函数
 * @param {Object} target 要校验的目标对象（包含需要校验的属性值）
 * @param {Object} rules 校验规则
 * @param {Function} callback 结果回调函数（错误结果，通过的字段对象集合）
 * @returns {Object} 校验的结果
 * 校验规则模板:
 * const rules = {
 *   name: {                                           -------- 若为bool值，表示required；若为字符串，表示alias，且required为true
 *     alias: 'key的别名，比如：姓名',                   -------- 若无，则默认为key值
 *     required: '为空时要提示的字符串或true(必填)',      -------- 为bool值表示是否必填，为字符串表示true并提示该字符串
 *     pattern: /这里是正则表达式/,                      -------- 正则匹配校验
 *     length: 字符串长度,                              -------- 长度校验
 *     min: 字符串长度或数字最小值,                      -------- 最小值校验
 *     max: 字符串长度或数字最大值,                      -------- 最大值校验
 *     validate: '自定义校验函数(参数1：当前值，参数2：所有值的对象)'
 *                                                      -------- 返回 true 则校验通过，false 校验不通过（若返回字符串表示校验"不通过"，并且作为提示信息）
 *     message: '校验不通过的提示文字'                    -------- 校验不通过的提示文字，若无则提示默认文字
 *     trim: true                                       --------- 是否去掉字符串的首尾空格，默认为true
 *   },
 *   mobile: { ... }
 * }
 * 校验结果模板:
 * const errors = { name: '姓名不能为空', mobile: '手机号码输入不正确' };
 * errors.hasError（）  // 校验是否出错
 * errors.first()       // 获取检验结果的第一个错误提示字符串    ------ 若带参数：指定第几个
 * errors.firstKey()    // 获取校验结果的第一个错误字段的key值   ------ 若带参数：指定第几个
 */
export default function validator(target, rules, callback) {
  const ruleKeys = rules ? Object.keys(rules) : []
  if (!ruleKeys.length) return new Errors()

  let results = {} // 正确结果
  let errors = {} // 错误结果
  ruleKeys.forEach(key => {
    // 规则
    let rule = rules[key] || {}
    if (typeof rule === 'boolean') rule = { required: rule }
    if (typeof rule === 'string') rule = { required: true, alias: rule }
    // 输入值
    let value = target[key]
    const isEmpty = (
      value === undefined
      || value === null
      || value === ''
      || Number.isNaN(value)
      || JSON.stringify(value) === '{}'
      || JSON.stringify(value) === '[]'
    )

    const {
      required,
      pattern,
      validate,
      alias = key,
      message = `请输入正确的${alias}`,
      trim = true,
      min = 0,
      max = 0,
    } = rule
    // 去掉字符串首位空格
    if (trim && typeof value === 'string') value = value.trim()

    let { length = 0 } = rule
    let minLength = 0
    let maxLength = 0
    if (/[[{].*[\]}]/.test(length)) {
      length.match(/\d+/g, (matched) => {
        if (matched) {
          minLength = matched[0] || 0
          maxLength = matched[1] || 0
        }
      })
      length = 0
    } else if (Array.isArray(length)) {
      minLength = length[0] || 0
      maxLength = length[1] || 0
      length = 0
    }

    let tips = null
    if (required && isEmpty) {
      tips = typeof required === 'string' ? required : `请输入${alias}`
    } else if (
      !isEmpty
      && ((length && value.length !== length) // 长度校验
      || (min && value < min) // 最小值校验
      || (max && value > max) // 最大值校验
      || (minLength && value.length < minLength) // 最小长度校验
      || (maxLength && value.length > maxLength) // 最大长度校验
      || (pattern && pattern instanceof RegExp && !pattern.test(value))) // 正则校验
    ) {
      tips = message
    } else if (!isEmpty && typeof validate === 'function') {
      // 自定义校验函数
      const res = validate(value, target)
      if (typeof res === 'string') {
        tips = res
      } else {
        tips = !res ? message : null
      }
    }

    results = tips ? results : { ...results, [key]: value }
    // 错误
    errors = tips ? { ...errors, [key]: tips } : errors
  })

  errors = new Errors(errors)
  if (typeof callback === 'function') {
    if (errors.hasError()) callback(errors)
    else callback(false, results)
  }

  return errors
}
