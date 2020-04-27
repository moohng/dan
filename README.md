# Validator

[![Build Status](https://travis-ci.org/moohng/dan.svg?branch=master)](https://travis-ci.org/moohng/dan)

各种实用工具函数集合：

- [acc](src/acc)
- [validator](src/validator)
- [copy](src/copy.js)
- [cut](src/cut.js)
- [dateFormat](src/dateFormat.js)
- [decimalPadEnd](src/decimalPadEnd.js)
- [decode](src/decode.js)
- [encode](src/encode.js)
- [es6tpl](src/es6tpl.js)
- [merge](src/merge.js)
- [moneyFormat](src/moneyFormat.js)
- [querystring](src/querystring.js)
- [querystringify](src/querystringify.js)
- [round](src/round.js)
- [splitFormat](src/splitFormat.js)
- [timerFormat](src/timerFormat.js)

## 安装

```bash
# npm
$ npm i -S @moohng/dan
# or yarn
$ yarn add @moohng/dan
```

## 使用

**ES Module**

```js
// 全部引入
import dan from '@moohng/dan'
// 单个引入
import { validator } from '@moohng/dan'
// 或
import validator from '@moohng/dan/validator'
```

**CommonJS**

```js
var dan = require('@moohng/dan')
// 或
var validator = require('@moohng/dan').validator
var validator = require('@moohng/dan/validator')
```

**浏览器**

定义全局变量 `dan`

```html
<!-- 锁定版本号 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan@1.3.18/dist/dan.mini.js></script>
<!-- 使用最新版本 -->
<script src=//cdn.jsdelivr.net/npm/@moohng/dan/dist/dan.mini.js></script>
```

## 开发

### 打包

```bash
# lib
$ yarn build
# mini
$ yarn build:mini
```

### 发布

该项目通过 `Travis` 自动编译和发布到 `npm` 平台

- 通过 `npm version patch` 增加版本号
- `git push` 到 GitHub 仓库
- 通过 GitHub 的 release 发版，会触发 Travis 平台执行编译和测试指令，通过之后会自动 publish 到 npm 平台
