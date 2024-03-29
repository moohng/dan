interface Validate<T> {
  (value: unknown, target: T): boolean | string;
}

export interface Rule<T> {
  key: keyof T;
  required?: boolean | string;
  pattern?: RegExp;
  validate?: Validate<T>;
  alias?: string;
  message?: string;
  trim?: boolean;
  length?: number | [number, number];
  min?: number;
  max?: number;
}

interface Result<T> {
  key: keyof T;
  message: string;
}

interface ResultCallback<T> {
  (error?: boolean, result?: ErrorResult<T>): void;
}

/**
 * 校验错误结果
 */
class ErrorResult<T> {
  constructor(private errors?: Result<T>[]) {}

  get hasError(): boolean {
    return (this.errors?.length ?? -1) > 0;
  }

  first(index = 0): string | undefined {
    return this.errors?.[index]?.message;
  }
}

/**
 * 校验函数
 * @param target 要校验的目标对象（包含需要校验的属性值）
 * @param rules 校验规则
 * @param callback 结果回调函数（错误结果，通过的字段对象集合）
 * @returns 校验的结果
 * 校验规则模板:
 * const rule = {
 *   key: 'name',                                     -------- 待校验的字段名称
 *   alias: 'key的别名，比如：姓名',                   -------- 若无，则默认为key值
 *   required: '为空时要提示的字符串或true(必填)',      -------- 为bool值表示是否必填，为字符串表示true并提示该字符串
 *   pattern: /这里是正则表达式/,                      -------- 正则匹配校验
 *   length: 字符串长度,                              -------- 长度校验
 *   min: 字符串长度或数字最小值,                      -------- 最小值校验
 *   max: 字符串长度或数字最大值,                      -------- 最大值校验
 *   validate: '自定义校验函数(参数1：当前值，参数2：所有值的对象)'
 *                                                    -------- 返回 true 则校验通过，false 校验不通过（若返回字符串表示校验"不通过"，并且作为提示信息）
 *   message: '校验不通过的提示文字'                    -------- 校验不通过的提示文字，若无则提示默认文字
 *   trim: true                                       --------- 是否去掉字符串的首尾空格，默认为true
 * }
 * 校验结果模板:
 * const errors = [{ key: 'phone', message: '手机号码输入不正确' }];
 * errors.hasError      // 校验是否出错
 * errors.first()       // 获取检验结果的第一个错误提示字符串    ------ 若带参数：指定第几个
 */
function validator<K extends Record<string, unknown>>(target: K, rules: Rule<K>[], callback?: ResultCallback<K>): ErrorResult<K> {
  if (!rules.length) {
    return new ErrorResult();
  }

  const errors:  Result<K>[] = []; // 错误结果

  rules.forEach(rule => {
    // 输入值
    let value = target[rule.key];
    const isEmpty = (
      value === undefined
      || value === null
      || value === ''
      || Number.isNaN(value)
      || JSON.stringify(value) === '{}'
      || JSON.stringify(value) === '[]'
    );

    const {
      required,
      pattern,
      validate,
      alias = rule.key,
      message = `请输入正确的${String(alias)}`,
      trim = true,
      min = 0,
      max = 0,
    } = rule;
    // 去掉字符串首位空格
    if (trim && typeof value === 'string') {
      value = value.trim() as unknown as K[keyof K];
    }

    let { length = 0 } = rule;
    let minLength = 0;
    let maxLength = 0;
    if (Array.isArray(length)) {
      minLength = length[0] || 0;
      maxLength = length[1] || 0;
      length = 0;
    }

    let tips = null;

    if (isEmpty) {
      if (required) {
        tips = typeof required === 'string' ? required : `请输入${String(alias)}`;
      }
    } else {
      if (typeof value === 'string') {
        // 如果是字符串  ===>>> 长度校验 正则校验
        if ((length && value.length !== length) || (minLength && value.length < minLength) || (maxLength && value.length > maxLength) || (pattern instanceof RegExp && !pattern.test(value))) {
          tips = message;
        }
      } else if (typeof value === 'number') {
        // 如果是数字  ===>>> 最大值、最小值校验
        if ((min && value < min) || (max && value > max)) {
          tips = message;
        }
      }

      // 自定义校验函数  ===>>>  优先级最高、会覆盖之前的校验
      if (typeof validate === 'function') {
        const res = validate(value, target);
        if (typeof res === 'string') {
          tips = res;
        } else {
          tips = !res ? message : null;
        }
      }
    }
    // 错误结果
    if (tips) {
      errors.push({ key: rule.key, message: tips });
    }
  });

  const result = new ErrorResult(errors);

  typeof callback === 'function' && callback(result.hasError, result);

  return result;
}

export default validator;

export const Pattern = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^1\d{10}$/,
  idCard: /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  emoji: /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/,
};
