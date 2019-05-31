/**
 * Helper function to generate a mixin that registers module and computed properties on component creation
 *
 * @param   {string|Array}  path        The path to register the Vuex module on
 * @param   {object}        module      The module definition to register when the
 * @param   {function}      callback    A callback returning store members to be added to the component definition
 * @param   {object}       [options]    Optional Vuex module registration options
 * @returns {object}                    The mixin
 */
export function registerModule(path, module, callback, options) {
  const hasModule = (store, path) => !!(store.state && store.state[path])
  
  return {
    beforeCreate () {
      !hasModule(this.$store, path) && this.$store.registerModule(path, module, options)
      const members = callback()
      this.$options.computed = Object.assign(this.$options.computed || {}, members.computed || {})
      this.$options.methods = Object.assign(this.$options.methods || {}, members.methods || {})
    },

    destoyed () {
      this.$store.unregisterModule(path)
    }
  }
}
