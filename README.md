<h1 align="center">dan.js</h1>

<p align="center">
  <img alt="Node.js CI" src="https://github.com/moohng/dan/workflows/Node.js%20CI/badge.svg">
  <img alt="Node.js Package" src="https://github.com/moohng/dan/workflows/Node.js%20Package/badge.svg">
</p>

<p align="center">
  <!-- <img alt="Travis (.org)" src="https://img.shields.io/travis/moohng/dan"> -->
  <!-- <img alt="Codecov" src="https://img.shields.io/codecov/c/github/moohng/dan?token=123"> -->
  <img alt="npm" src="https://img.shields.io/npm/dw/@moohng/dan">
  <!-- <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/moohng/dan"> -->
  <img alt="npm" src="https://img.shields.io/npm/v/@moohng/dan">
  <img alt="GitHub" src="https://img.shields.io/github/license/moohng/dan">
</p>

实用工具函数库，最新版已全面支持 typescript：

- ~~[acc](src/acc) 浮点数精确计算~~，推荐使用 [big.js](https://github.com/MikeMcl/big.js/)
- [validator](src/validator) 字段校验
- [copy](src/copy.ts) 复制文本
- [cut](src/cut.ts) 截取小数位数
- [decimalPadEnd](src/decimalPadEnd.ts) 小数末尾补0
- [es6tpl](src/es6tpl.ts) es6字符串模板
- [splitFormat](src/splitFormat.ts) 字符串分割
- [moneyFormat](src/moneyFormat.ts) 金额格式化（千分位逗号隔开）
- [random](src/random.ts) 生成随机数/字符串
- [round](src/round.ts) 近似小数位数
- [merge](src/merge.ts) 对象深合并
- [decode](src/decode.ts) URI解码
- [encode](src/encode.ts) URI编码
- [querystring](src/querystring.ts) 解析query字符串到对象
- [querystringify](src/querystringify.ts) query对象字符串化
- [dateFormat](src/dateFormat.ts) 日期格式化
- [timeFormat](src/timeFormat.ts) 时间戳转时分秒
- [unique](src/unique.ts) 数组去重
- [sleep](src/sleep.ts) 等待

## 安装

```bash
# npm
$ npm i -S @moohng/dan
# or yarn
$ yarn add @moohng/dan
```

## 使用

### ES Module

```js
// 全部引入
import * as dan from '@moohng/dan'
// 单个引入
import { validator } from '@moohng/dan'
import validator from '@moohng/dan/lib/validator'
```

### 浏览器

```html
<!-- 锁定版本号 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan@1.3.18/dist/dan.min.js></script>
<!-- 使用最新版本 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan/dist/dan.min.js></script>
```

## 开发

### 打包

```bash
# commonjs
$ yarn build
# browser
$ yarn build:dist
```

### 发布

~~该项目通过 `Travis` 自动编译和发布到 `npm` 平台~~

- ~~通过 `npm version patch` 增加版本号~~
- ~~`git push` 到 GitHub 仓库~~
- ~~通过 GitHub 的 release 发版，会触发 Travis 平台执行编译和测试指令，通过之后会自动 publish 到 npm 平台~~

项目使用 github workflows 自动编译检查和发布到 npm 平台
