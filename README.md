# Validator

一个超简单、超轻量的字段校验工具

## 安装

```bash
$ yarn add @moohng/validator
```

## 核心功能的使用

**校验的方式：通过一个函数接收两个参数（目标集合，校验规则）返回校验的结果**。

这样实现的好处在于：十分灵活、可适用于任何地方、耦合性低、可扩展性强，不仅十分轻量，还能满足大多数的校验场合。

```js
const { validator } = require('@moohng/validator')

// 定义每个字段的校验规则
const rules = {
  name: {
    alias: '姓名',   // 字段别名，用于默认提示信息的字段名称，省略则为当前字段的 key
    /**
     * 为空判断：字段为 null、undefined、[]、''、{} 时认为是空
     * required 可为 Boolean 类型或 String 类型，当为字符串时，则表示为空时提示的文本信息，否则为默认提示信息
     */
    required: true,
    trim: false, // 校验之前是否去掉字符串的首位空格，默认为 true
  },
  email: {
    required: '请输入邮箱哦',
    pattern: /\w+@\w+\.com/,  // 必须是一个正则表达式
    message: '您输入的邮箱不正确', // 正则校验不通过时的提示文本信息，省略则提示默认信息
  },
  age: {
    /**
     * 自定义校验规则
     * 该函数接收 当前校验的值 和 当前校验的所有值的集合 两个参数
     * 返回校验的结果：
     * 若为 true 或 非字符串，则校验通过
     * 若为 false，则校验不通过，提示信息为 message，若 message 不存在，则提示默认信息
     * 若为字符串，则认为校验不通过，并且将该字符串作为提示文本信息
     */
    validate: (val, target) => {
      return parseInt(val, 10) > 10 || '年龄必须大于10岁'
    }
  }
}

/**
 * 第一个参数是要校验字段的集合（必须是一个对象）
 * 第二个参数是校验的规则（必须是一个对象）
 * 校验的结果是一个包含所有校验不通过的字段的提示文本的一个对象
 * 比如：{ name: '请输入姓名', email: '您输入的邮箱不正确' }
 */
const result = validator({
  name: '',
  email: 'ewrwerw@',
  age: 8
}, rules)

/**
 * 校验结果提供 3 个方法用于方便获取错误信息
 * result.hasError()  => 返回校验结果是否有错（只要有一个字段校验不通过，该方法返回 true）
 * result.first()   => 返回校验结果的第一个提示信息（一般对于表单校验，我们可能从上到下提示错误信息）
 * result.firstKey()  => 返回校验结果的第一个字段的 key 值
 * first(1) 和 firstKey(2) 可指定参数，分别返回第 n 个结果信息
 */
console.log('校验结果，是否有错', result.hasError())

if (result.hasError()) {
  console.log('第1个错误提示', result.first())
  console.log('第2个错误提示', result.first(2))
}
```

## 在 Vue 中使用

> 由于个人的需求，在以上核心功能上又封装了对`Vue`的支持。这可能并不是很适用，但可以此作为参考

实现目标：

- 根据校验的结果，调整页面组件的样式（比如：字段名称变红）
- 根据校验的结果，将第一个出错的字段区域滚动到屏幕可视范围
- 从页面上重新改变字段的值后，样式恢复到正常状态（比如：从之前的字段名称变红恢复正常）
- 根据校验结果，用 `Toast` 弹出第一个错误提示信息

```html
<template>
  <!-- 校验的结果和对应的字段名称必须传入v-error指令中 -->
  <!-- 样式的更改和屏幕的滚动都封装在指令内部处理 -->
  <my-input name="姓名" v-model="form.name" v-error:name="result" />
  <my-select name="选择性别" v-model="form.sex" v-error:sex="result" />
  <my-upload name="上传头像" v-model="form.head" v-error:head="result" />
  <button @click="onSave">保存</button>
</template>

<script>
import { validator, errorMixin } from '@moohng/validator'
import { rules } from './rules' // 假设已正常定义

export default {
  data() {
    return {
      form: {},
      result: null, // 校验结果必须先在此声明，为了保证结果是响应式的
    }
  },
  /* errorMixin 是根据我个人的需求实现的一个Vue自定义指令（v-error）
   * 这可以根据自己的需求重新封装一个指令
   */
  mixins: [errorMixin],
  methods: {
    onSave() {
      this.result = validator(this.form, rules);
      if (this.result.hasError()) {
        // 弹出第一个错误提示（假设 $toast 方法已正确定义）
        this.$toast(this.result.first());
      }
    }
  }
}
</script>
```

建议的做法：

- `result`必须在`data`中定义，保证它一定是响应式的。因为这样，对于校验结果的变化，才能自动去更新页面的样式；
- 因为`result`是响应式的，所以我们就可以拿着这个结果做错误的处理（样式的更改等）；

比如：

```html
<template>
  <my-input name="姓名" v-model="name" :class="{ 'input-error': result['name'] }">
  <my-input name="年龄" v-model="age" :class="{ 'input-error': result['age'] }">
</template>

<script>
// ...
</script>

<style>
.input-error {
  /* ... */
}
</style>
```

同样，你也可以通过`Vue`的自定义指令方式实现，只需要将`result`、对应的字段名、错误样式的类名3个参数传进去即可。

以上都是在保存的时候触发校验，如果你需要在改变的时候就触发，也可自己实现。比如`watch`（监听）`form`的变化。

局限性：目前每次触发校验都是对所有的字段进行校验，不能对单个字段的变化做校验。如果有时间再改进吧
