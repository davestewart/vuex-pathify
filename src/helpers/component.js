import { makeGetter, makeSetter } from '../services/accessors'
import { makePaths } from '../services/paths'
import vuex from './vuex'

// -------------------------------------------------------------------------------------------------------------------
// entry
// -------------------------------------------------------------------------------------------------------------------

export function sync (path, props) {
  return make(path, props, syncOne)
}

export function get (path, props) {
  return make(path, props, getOne)
}

// -------------------------------------------------------------------------------------------------------------------
// utility
// -------------------------------------------------------------------------------------------------------------------

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
 *     - @usage                                 ...sync('module', ['foo|updateFoo'])
 *
 * @param   {string|Object}         path        a path to a module, or a hash of state/getter or commit/action references
 * @param   {Object|Array}          props       a hash of state/getter or commit/action references
 * @param   {Function}              fn          the callback function to create the setter
 * @returns {{set, get}}                        a hash of get/set Objects
 */
export function make (path, props, fn) {
  // expand path / props
  const getters = fn === getOne
    ? vuex.store.getters
    : null
  const data = makePaths(path, props, vuex.store.state, getters)

  // handle single paths
  if (typeof data === 'string') {
    return fn(data)
  }

  // handle multiple properties
  Object
    .keys(data)
    .forEach(key => {
      data[key] = fn(data[key])
    })
  return data
}

// -------------------------------------------------------------------------------------------------------------------
// one
// -------------------------------------------------------------------------------------------------------------------

/**
 * Creates a single 2-way vue:vuex computed property
 *
 * @param   {string}      path        a path to a state/getter reference. Path can contain an optional commit / action reference, separated by a |, i.e. foo/bar|updateBar
 * @returns {Object}                  a single get/set Object
 */
export function syncOne (path) {
  let [getter, setter] = path.split('|')
  if (setter) {
    setter = getter.replace(/\w+!?$/, setter.replace('!', '') + '!')
  }
  return getter && setter
    ? { get: getOne(getter), set: setOne(setter) }
    : { get: getOne(getter), set: setOne(getter) }
}

/**
 * Creates a single 1-way vue:vuex computed getter
 *
 * @param   {string}      path        a path to a state/getter reference
 * @returns {Object}                  a single getter function
 */
export function getOne (path) {
  let getter
  return function (...args) {
    if (!this.$store) {
      throw new Error('[Vuex Pathify] Unexpected condition: this.$store is undefined.\n\nThis is a known edge case with some setups and will cause future lookups to fail')
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
export function setOne (path) {
  let setter
  return function (value) {
    if (!setter) {
      setter = makeSetter(this.$store, path)
    }
    this.$nextTick(() => this.$emit('sync', path, value))
    return setter(value)
  }
}
