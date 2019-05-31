class Errors {
  constructor(errors = {}) {
    Object.assign(this, errors)
  }

  hasError() {
    return Object.keys(this).length > 0
  }

  first(index = 1) {
    return Object.values(this)[index - 1]
  }

  firstKey(index = 1) {
    return Object.keys(this)[index - 1]
  }
}

export default Errors
