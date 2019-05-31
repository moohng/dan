'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var Errors =
/*#__PURE__*/
function () {
  function Errors() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Errors);

    Object.assign(this, errors);
  }

  _createClass(Errors, [{
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
  }, {
    key: "errors",
    get: function get() {}
  }]);

  return Errors;
}();

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

function validator(target, rules, callback) {
  var ruleKeys = rules ? Object.keys(rules) : [];
  if (!ruleKeys.length) return new Errors();
  var results = {}; // 正确结果

  var errors = {}; // 错误结果

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ruleKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      // 规则
      var rule = rules[key] || {};
      typeof rule === 'boolean' && (rule = {
        required: rule
      });
      typeof rule === 'string' && (rule = {
        required: true,
        alias: rule
      }); // 输入值

      var value = target[key];
      var isEmpty = value === undefined || value === null || value === '' || Number.isNaN(value) || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]';
      var _rule = rule,
          required = _rule.required,
          pattern = _rule.pattern,
          validate = _rule.validate,
          _rule$alias = _rule.alias,
          alias = _rule$alias === void 0 ? key : _rule$alias,
          _rule$message = _rule.message,
          message = _rule$message === void 0 ? "\u8BF7\u8F93\u5165\u6B63\u786E\u7684".concat(alias) : _rule$message,
          _rule$trim = _rule.trim,
          trim = _rule$trim === void 0 ? true : _rule$trim,
          _rule$min = _rule.min,
          min = _rule$min === void 0 ? 0 : _rule$min,
          _rule$max = _rule.max,
          max = _rule$max === void 0 ? 0 : _rule$max,
          _rule$length = _rule.length,
          length = _rule$length === void 0 ? 0 : _rule$length; // 去掉字符串首位空格

      trim && typeof value === 'string' && (value = value.trim());
      var tips = null;

      if (required && isEmpty) {
        tips = typeof required === 'string' ? required : "\u8BF7\u8F93\u5165".concat(alias);
      } else if (!isEmpty && length && value.length !== length || ( // 长度校验
      min && _typeof(/^\d+$/.test(value)) ? value < min : value.length < min) || ( // 最小值校验
      max && _typeof(/^\d+$/.test(value)) ? value > max : value.length > max) || // 最大值校验
      pattern && pattern instanceof RegExp && !pattern.test(value) // 正则校验
      ) {
          tips = message;
        } else if (!isEmpty && typeof validate === 'function') {
        // 自定义校验函数
        var res = validate(value, target);
        tips = typeof res === 'string' ? res : !res ? message : null;
      }

      results = tips ? results : _objectSpread({}, results, _defineProperty({}, key, value)); // 错误

      errors = tips ? _objectSpread({}, errors, _defineProperty({}, key, tips)) : errors;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  errors = new Errors(errors);

  if (typeof callback === 'function') {
    errors.hasError() ? callback(errors) : callback(false, results);
  }

  return errors;
}

module.exports = validator;
