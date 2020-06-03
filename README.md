<h1 align="center">dan.js</h1>

<p align="center">
  <img alt="Node.js CI" src="https://github.com/moohng/dan/workflows/Node.js%20CI/badge.svg">
  <img alt="Node.js Package" src="https://github.com/moohng/dan/workflows/Node.js%20Package/badge.svg">
</p>

<p align="center">
  <img alt="Travis (.org)" src="https://img.shields.io/travis/moohng/dan">
  <!-- <img alt="Codecov" src="https://img.shields.io/codecov/c/github/moohng/dan?token=123"> -->
  <img alt="npm" src="https://img.shields.io/npm/dw/@moohng/dan">
  <!-- <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/moohng/dan"> -->
  <img alt="npm" src="https://img.shields.io/npm/v/@moohng/dan">
  <img alt="GitHub" src="https://img.shields.io/github/license/moohng/dan">
</p>

各种实用工具函数集合：

- [acc](src/acc) 浮点数精确计算
- [validator](src/validator) 字段校验
- [copy](src/copy.js) 复制文本
- [cut](src/cut.js) 截取小数位数
- [dateFormat](src/dateFormat.js) 日期格式化
- [decimalPadEnd](src/decimalPadEnd.js) 小数末尾补0
- [decode](src/decode.js) URI解码
- [encode](src/encode.js) URI编码
- [es6tpl](src/es6tpl.js) es6字符串模板
- [merge](src/merge.js) 对象深合并
- [moneyFormat](src/moneyFormat.js) 金额格式化（千分位逗号隔开）
- [querystring](src/querystring.js) 解析query字符串到对象
- [querystringify](src/querystringify.js) query对象字符串化
- [random](src/random.js) 生成随机数/字符串
- [round](src/round.js) 近似小数位数
- [splitFormat](src/splitFormat.js) 字符串分割
- [timerFormat](src/timerFormat.js) 时间戳转时分秒
- [unique](src/unique.js) 数组去重

## 安装

```bash
# npm
$ npm i -S @moohng/dan
# or yarn
$ yarn add @moohng/dan
```

## 使用

### ES Module

引用源码，需要自己使用 `Babel` 编译

```js
// 全部引入
import * as dan from '@moohng/dan'
// 单个引入
import { validator } from '@moohng/dan'
import validator from '@moohng/dan/src/validator'
```

### CommonJS

```js
var dan = require('@moohng/dan')
// 推荐使用
var validator = require('@moohng/dan/lib/validator')
```

### 浏览器

```html
<!-- 锁定版本号 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan@1.3.18/dist/dan.min.js></script>
<!-- 使用最新版本 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan/dist/dan.min.js></script>
<!-- 使用单个函数 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan/dist/copy.min.js></script>
```

## 开发

### 打包

```bash
# commonjs
$ yarn lib
# browser
$ yarn dist
```

### 发布

~~该项目通过 `Travis` 自动编译和发布到 `npm` 平台~~

- ~~通过 `npm version patch` 增加版本号~~
- ~~`git push` 到 GitHub 仓库~~
- ~~通过 GitHub 的 release 发版，会触发 Travis 平台执行编译和测试指令，通过之后会自动 publish 到 npm 平台~~

项目使用 github workflows 自动编译检查和发布到 npm 平台
