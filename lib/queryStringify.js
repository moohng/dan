'use strict';

/**
 * 转换query对象到字符串
 * @param {object} query query对象
 */
function queryStringify() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(query).reduce(function (s, key) {
    var value = query[key];
    var result = "&".concat(key, "=").concat(value);

    if (Array.isArray(value)) {
      result = value.reduce(function (q, v) {
        return "".concat(q, "&").concat(key, "=").concat(v);
      }, '');
    }

    return s + result;
  }, '').slice(1);
}

module.exports = queryStringify;
