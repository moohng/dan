var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 校验错误结果
 */
var ErrorResult = /** @class */ (function (_super) {
    __extends(ErrorResult, _super);
    function ErrorResult(errors) {
        var _a;
        var _this = _super.call(this, (_a = errors) === null || _a === void 0 ? void 0 : _a.length) || this;
        _this.hasError = _this.length > 0;
        errors && errors.forEach(function (item, index) { return _this[index] = item; });
        return _this;
    }
    ErrorResult.prototype.first = function (index) {
        if (index === void 0) { index = 0; }
        return this[index].message;
    };
    return ErrorResult;
}(Array));
/**
 * 校验函数
 * @param target 要校验的目标对象（包含需要校验的属性值）
 * @param rules 校验规则
 * @param callback 结果回调函数（错误结果，通过的字段对象集合）
 * @returns 校验的结果
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
    if (!rules.length) {
        return new ErrorResult();
    }
    var errors = []; // 错误结果
    rules.forEach(function (rule) {
        // 规则
        if (typeof rule === 'string')
            rule = { required: true, name: rule };
        // 输入值
        var value = target[rule.name];
        var isEmpty = (value === undefined
            || value === null
            || value === ''
            || Number.isNaN(value)
            || JSON.stringify(value) === '{}'
            || JSON.stringify(value) === '[]');
        var required = rule.required, pattern = rule.pattern, validate = rule.validate, _a = rule.alias, alias = _a === void 0 ? rule.name : _a, _b = rule.message, message = _b === void 0 ? "\u8BF7\u8F93\u5165\u6B63\u786E\u7684" + alias : _b, _c = rule.trim, trim = _c === void 0 ? true : _c, _d = rule.min, min = _d === void 0 ? 0 : _d, _e = rule.max, max = _e === void 0 ? 0 : _e;
        // 去掉字符串首位空格
        if (trim && typeof value === 'string') {
            value = value.trim();
        }
        var _f = rule.length, length = _f === void 0 ? 0 : _f;
        var minLength = 0;
        var maxLength = 0;
        if (Array.isArray(length)) {
            minLength = length[0] || 0;
            maxLength = length[1] || 0;
            length = 0;
        }
        var tips = null;
        if (isEmpty) {
            if (required) {
                tips = typeof required === 'string' ? required : "\u8BF7\u8F93\u5165" + alias;
            }
        }
        else {
            if (typeof value === 'string') {
                // 如果是字符串  ===>>> 长度校验 正则校验
                if ((length && value.length !== length) || (minLength && value.length < minLength) || (maxLength && value.length > maxLength) || (pattern instanceof RegExp && !pattern.test(value))) {
                    tips = message;
                }
            }
            else if (typeof value === 'number') {
                // 如果是数字  ===>>> 最大值、最小值校验
                if ((min && value < min) || (max && value > max)) {
                    tips = message;
                }
            }
            // 自定义校验函数  ===>>>  优先级最高、会覆盖之前的校验
            if (typeof validate === 'function') {
                var res = validate(value, target);
                if (typeof res === 'string') {
                    tips = res;
                }
                else {
                    tips = !res ? message : null;
                }
            }
        }
        // 错误结果
        if (tips) {
            errors.push({ name: rule.name, message: tips });
        }
    });
    var result = new ErrorResult(errors);
    typeof callback === 'function' && callback(result.hasError, result);
    return result;
}
