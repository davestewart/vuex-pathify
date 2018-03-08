export default {
  camel: function (...args) {
    return args.shift() + args
      .map(text => text.replace(/\w/, c => c.toUpperCase()))
      .join('')
  },

  snake: function (...args) {
    return this
      .camel(...args)
      .replace(/([a-z])([A-Z])/g, (match, a, b) => a + '_' + b)
      .toLowerCase()
  },

  const: function (...args) {
    return this
      .snake(...args)
      .toUpperCase()
  }
}
