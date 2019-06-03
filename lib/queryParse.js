'use strict';

var __chunk_1 = require('./chunk.js');

/**
 * 解析 qs 字符串到 query 对象
 * @param {string} qs qs 字符串
 */
function queryParse(qs) {
  if (typeof qs !== 'string') return {};
  var startIndex = qs.lastIndexOf('?');
  if (startIndex < 0) return {};
  return qs.slice(startIndex + 1).match(/[^&]+/g).reduce(function (query, matched) {
    var t = matched.match(/[^=]+/g);
    var value = t[1];
    if (typeof value === 'undefined') return query;
    var hasKey = query[t[0]];

    if (hasKey !== undefined) {
      return __chunk_1._objectSpread({}, query, __chunk_1._defineProperty({}, t[0], [].concat(hasKey, value)));
    }

    return __chunk_1._objectSpread({}, query, __chunk_1._defineProperty({}, t[0], value));
  }, {});
}

module.exports = queryParse;
