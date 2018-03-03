export default {
  none: function () {
    return name => name
  },

  camel: function prefix (prefix = '') {
    return name => prefix + name
      .replace(/\w/, c => c.toUpperCase())
  },

  snake: function (prefix = '') {
    if (prefix) {
      prefix += '_'
    }
    return name => (prefix + name)
      .replace(/([a-z])([A-Z])/g, (match, a, b) => a + '_' + b)
      .toLowerCase()
  },

  const: function (prefix = '') {
    return name => this.snake(prefix)(name).toUpperCase()
  }
}
