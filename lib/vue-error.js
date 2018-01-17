/**
 * 错误行为的处理，自定义指令对象
 */
export const error = {
  bind(el) {
    el.handler = e => {
      e.currentTarget.style.color = null
    }
    el.addEventListener('click', el.handler)
  },
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
  update(el, { value: result, arg: name }) {
    if (!result || !result[name]) return
    el.style.color = '#ff635b'
    result[name] = null
    if (result.firstKey() === name) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
    }
  }
}
/**
 * 通过mixin的方式扩展Vue组件的自定义指令 v-error
 * 使用模板: <input v-error:key="result" />
 * key 是校验的字段名称，result 是 validate 函数执行的返回结果
 * 且 result 必须是响应式的，可在组件的 data 中定义
 */
export const errorMixin = {
  directives: { error }
}
