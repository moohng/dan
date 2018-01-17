// 校验结果操作方法
export const resultOperation = {
  hasError() {
    return Object.keys(this).length > 0
  },
  first(index = 0) {
    return Object.values(this)[index]
  },
  firstKey(index = 0) {
    return Object.keys(this)[index]
  }
}
