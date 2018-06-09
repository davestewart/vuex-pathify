import { makeGetter, makeSetter } from '../services/store'
import { expandGet, expandSync, expandCall } from '../services/wildcards'
import { makePaths } from '../services/paths'
import vuex from './vuex'

// -------------------------------------------------------------------------------------------------------------------
// entry
// -------------------------------------------------------------------------------------------------------------------

export function get (path, props) {
  return make(path, props, getOne, function (path) {
    return expandGet(path, vuex.store.state, vuex.store.getters)
  })
}

export function sync (path, props) {
  return make(path, props, syncOne, function (path) {
    return expandSync(path, vuex.store.state)
  })
}

export function call (path, props) {
  return make(path, props, callOne, function (path) {
    return expandCall(path, vuex.store._actions)
  })
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
 * @param   {Function}              fnHandler   a callback function to create the handler
 * @param   {Function}              fnResolver
 * @returns {{set, get}}                        a hash of Objects
 */
export function make (path, props, fnHandler, fnResolver) {
  // expand path / props
  const data = makePaths(path, props, fnResolver)

  // handle single paths
  if (typeof data === 'string') {
    return fnHandler(data)
  }

  // handle multiple properties
  Object
    .keys(data)
    .forEach(key => {
      data[key] = fnHandler(data[key])
    })
  return data
}

// -------------------------------------------------------------------------------------------------------------------
// one
// -------------------------------------------------------------------------------------------------------------------

/**
 * Creates a single 2-way vue:vuex computed property
 *
 * @param   {string}      path      a path to a state/getter reference. Path can contain an optional commit / action reference, separated by a |, i.e. foo/bar|updateBar
 * @returns {Object}                a single get/set Object
 */
export function syncOne (path) {
  let [getter, setter] = path.split('|')
  if (setter) {
    setter = getter.replace(/\w+!?$/, setter.replace('!', '') + '!')
  }
  return getter && setter
    ? { get: getOne(getter, true), set: setOne(setter) }
    : { get: getOne(getter, true), set: setOne(getter) }
}

/**
 * Creates a single 1-way vue:vuex computed getter
 *
 * @param   {string}      path          A path to a state/getter reference
 * @param   {boolean}    [stateOnly]    An optional flag to get from state only (used when syncing)
 * @returns {Object}                    A single getter function
 */
export function getOne (path, stateOnly) {
  let getter
  return function (...args) {
    if (!this.$store) {
      throw new Error('[Vuex Pathify] Unexpected condition: this.$store is undefined.\n\nThis is a known edge case with some setups and will cause future lookups to fail')
    }
    if (!getter) {
      getter = makeGetter(this.$store, path, stateOnly)
    }
    return getter(...args)
  }
}

/**
 * Creates a single 1-way vue:vuex setter
 *
 * @param   {string}      path      a path to an action/commit reference
 * @returns {Function}              a single setter function
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

/**
 * Creates a single action dispatcher
 *
 * @param   {string}      path      a path to an action/commit reference
 * @returns {Function}              a single setter function
 */
export function callOne (path) {
  return function (value) {
    this.$store.dispatch(path, value)
  }
}
