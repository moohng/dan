(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.validator = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





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

var Result = function () {
  function Result() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Result);

    Object.assign(this, errors);
  }

  createClass(Result, [{
    key: "hasError",
    value: function hasError() {
      return Object.keys(this).length > 0;
    }
  }, {
    key: "first",
    value: function first() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return Object.values(this)[index - 1];
    }
  }, {
    key: "firstKey",
    value: function firstKey() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return Object.keys(this)[index - 1];
    }
  }]);
  return Result;
}();

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
function validator(target, rules) {
  var ruleKeys = rules ? Object.keys(rules) : [];
  if (!ruleKeys.length) return new Result();
  var results = ruleKeys.reduce(function (errors, key) {
    var value = target[key];
    var tips = null;

    var _ref = rules[key] || {},
        required = _ref.required,
        pattern = _ref.pattern,
        validate = _ref.validate,
        _ref$alias = _ref.alias,
        alias = _ref$alias === undefined ? key : _ref$alias,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? '\u8BF7\u8F93\u5165\u6B63\u786E\u7684' + alias : _ref$message,
        _ref$trim = _ref.trim,
        trim = _ref$trim === undefined ? true : _ref$trim;
    // 去掉字符串首位空格


    trim && typeof value === 'string' && (value = value.trim());
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === undefined || value === null || !value.length || JSON.stringify(value) === '{}') {
      required && (tips = typeof required === 'string' ? required : '\u8BF7\u8F93\u5165' + alias);
    } else if (pattern && pattern instanceof RegExp && !pattern.test(value)) {
      // 正则校验
      tips = message;
    } else if (typeof validate === 'function') {
      // 自定义校验函数
      var res = validate(value, target);
      tips = typeof res === 'string' ? res : !res ? message : null;
    }
    return tips ? _extends({}, errors, defineProperty({}, key, tips)) : _extends({}, errors);
  }, {});
  return new Result(results);
}

return validator;

})));
