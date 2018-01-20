(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.validator = {})));
}(this, (function (exports) { 'use strict';

// 校验结果操作方法
var resultOperation = {
  hasError: function hasError() {
    return Object.keys(this).length > 0;
  },
  first: function first() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Object.values(this)[index];
  },
  firstKey: function firstKey() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Object.keys(this)[index];
  }
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

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
 *     validator: '自定义校验函数(参数1：当前值，参数2：所有值的对象)'
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
var validator = function validator(target, rules) {
  var results = Object.keys(rules).reduce(function (errors, key) {
    var value = target[key];
    var error = false;
    var _rules$key = rules[key],
        required = _rules$key.required,
        pattern = _rules$key.pattern,
        validator = _rules$key.validator,
        _rules$key$alias = _rules$key.alias,
        alias = _rules$key$alias === undefined ? key : _rules$key$alias,
        _rules$key$message = _rules$key.message,
        message = _rules$key$message === undefined ? '\u8BF7\u8F93\u5165\u6B63\u786E\u7684' + alias : _rules$key$message,
        _rules$key$trim = _rules$key.trim,
        trim = _rules$key$trim === undefined ? true : _rules$key$trim;

    trim && typeof value === 'string' && (value = value.trim());
    if (typeof value === 'undefined' || value === null || value.length <= 0 || JSON.stringify(value) === '{}') {
      required && (error = typeof required === 'string' ? required : '\u8BF7\u8F93\u5165' + alias);
    } else if (pattern && !pattern.test(value)) {
      // 正则校验
      error = message;
    } else if (typeof validator === 'function') {
      // 自定义校验函数
      var res = validator(value, target);
      if (typeof res === 'string') {
        error = res;
      } else if (!res) {
        error = message;
      }
    }
    return error ? _extends({}, errors, defineProperty({}, key, error)) : errors;
  }, {});
  return Object.setPrototypeOf(results, resultOperation);
};

/**
 * 错误行为的处理，自定义指令对象
 */
var error = {
  bind: function bind(el) {
    el.handler = function (e) {
      e.currentTarget.style.color = null;
    };
    el.addEventListener('click', el.handler);
  },
  unbind: function unbind(el) {
    el.removeEventListener('click', el.handler);
  },
  update: function update(el, _ref) {
    var result = _ref.value,
        name = _ref.arg;

    if (!result || !result[name]) return;
    el.style.color = '#ff635b';
    result[name] = null;
    if (result.firstKey() === name) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }
  }
};
/**
 * 通过mixin的方式扩展Vue组件的自定义指令 v-error
 * 使用模板: <input v-error:key="result" />
 * key 是校验的字段名称，result 是 validate 函数执行的返回结果
 * 且 result 必须是响应式的，可在组件的 data 中定义
 */
var errorMixin = {
  directives: { error: error }
};

exports.validator = validator;
exports.errorMixin = errorMixin;
exports.error = error;

Object.defineProperty(exports, '__esModule', { value: true });

})));
