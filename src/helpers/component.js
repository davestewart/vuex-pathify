import { makeGetter, makeSetter } from '../utils/accessors'
import { isObject } from '../utils/object'

/**
 * Creates a single 2-way vue:vuex computed property
 *
 * @usage   foo: sync('module/foo')
 * @usage   foo: sync('module/getFoo', 'module/saveFoo')
 *
 * @param   {string}      getter      a single path to a state/getter AND commit/action reference
 *                                    OR one path to a state/getter reference
 * @param   {string}     [setter]     AND an optional additional path to commit/action reference
 * @returns {Object}                  a single get/set Object
 */
export function sync (getter, setter) {
  return getter && setter
    ? { get: get(getter), set: set(setter) }
    : { get: get(getter), set: set(getter) }
}

/**
 * Creates a single 1-way vue:vuex computed getter
 *
 * @param   {string}      path        a path to a state/getter reference
 * @returns {Object}                  a single get/set Object
 */
export function get (path) {
  let getter
  return function (...args) {
    if (!this.$store) {
      throw new Error('[Superstore] Unexpected condition: this.$store is undefined.\n\nThis is a known edge case with some setups and will cause future lookups to fail')
    }
    if (!getter) {
      getter = makeGetter(this.$store, path)
    }
    return getter(...args)
  }
}

/**
 * Creates a single 1-way vue:vuex setter
 *
 * @param   {string}      path        a path to an action/commit reference
 * @returns {Function}                a single setter function
 */
export function set (path) {
  let setter
  return function (value) {
    if (!setter) {
      setter = makeSetter(this.$store, path)
    }
    this.$nextTick(() => this.$emit('sync', path, value))
    return setter(value)
  }
}

/**
 * Creates multiple 2-way vue:vuex computed properties
 *
 * The function has multiple usages:
 *
 *  1. multiple properties from multiple modules
 *
 *     - @usage                                 ...sync({foo: 'module1/foo', bar: 'module2/bar'})
 *
 *     - @param   {Object}          props       a hash of key:path state/getter or commit/action references
 *
 *  2. multiple properties from a single module (object shorthand)
 *
 *     - @usage                                 ...sync('module', {foo: 'foo', bar: 'bar'})
 *
 *     - @param   {string}          path        a path to a module
 *     - @param   {Object}          props       a hash of key:prop state/getter or commit/action references
 *
 *  3. multiple properties from a single module (array shorthand)
 *
 *     - @usage                                 ...sync('module', ['foo', 'bar'])
 *
 *     - @param   {string}          path        a path to a module
 *     - @param   {Array}           props       an Array of state/getter or commit/action references
 *
 * Where different getter / setters need to be specified, pass getter and setter in
 * the same string, separating with a | character:
 *
 *     - @usage                                 ...sync('module', ['getFoo|setFoo'])
 *
 * @param   {string|Object}         path        a path to a module, or a hash of state/getter or commit/action references
 * @param   {Object|Array}         [props]      a hash of state/getter or commit/action references
 * @returns {{set, get}}                        a hash of get/set Objects
 */
export function syncSome (path, props) {
  if (isObject(path)) {
    return makeSome('', path, sync)
  }
  return makeSome(path, props, sync)
}

/**
 * Creates multiple 1-way vue:vuex computed getters
 *
 * The function has multiple usages:
 *
 *  1. multiple properties from multiple modules
 *
 *     - @usage                                 ...sync({foo: 'module1/foo', bar: 'module2/bar'})
 *
 *     - @param   {Object}          props       a hash of key:path state/getter references
 *
 *  2. multiple properties from a single module (object shorthand)
 *
 *     - @usage                                 ...sync('module', {foo: 'foo', bar: 'bar'})
 *
 *     - @param   {string}          path        a path to a module
 *     - @param   {Object}          props       a hash of key:prop state/getter references
 *
 *  3. multiple properties from a single module (array shorthand)
 *
 *     - @usage                                 ...sync('module', ['foo', 'bar'])
 *
 *     - @param   {string}          path        a path to a module
 *     - @param   {Array}           props       an Array of state/getter references
 *
 * @param   {string|Object}         path        a path to a module, or a hash of state/getter references
 * @param   {Object|Array}         [props]      a hash or array of state/getter references
 * @returns {{Function}}                        a hash of getter functions
 */
export function getSome (path, props) {
  if (isObject(path)) {
    return makeSome('', path, get)
  }
  return makeSome(path, props, get)
}

// ---------------------------------------------------------------------------------------------------------------------
// utilities
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Utility function to make multiple getters/setters from [path, object] or [path, array] parameters
 *
 * @param   {string}          path        The absolute module path
 * @param   {Object|Array}    values      The Object or Array of Vuex state/getter or commit/action references
 * @param   {Function}        fn          The conversion function to call (sync, get or set)
 * @returns {Object}                      The built getters/setters object
 */
function makeSome (path, values, fn) {
  // root
  path = path
    ? path.replace(/\/*$/, '/')
    : ''

  // array: pre-convert to object
  if (Array.isArray(values)) {
    values = values
      .reduce(function (obj, value) {
        const key = String(value).split('|').shift()
        obj[key] = value
        return obj
      }, {})
  }

  // object: convert to function result
  return Object
    .keys(values)
    .reduce(function (obj, prop) {
      const targets = values[prop]
        .split('|')
        .map(target => path + target)
      obj[prop] = fn(...targets)
      return obj
    }, {})
}
