import { computed } from 'vue'
import { makeGetter, makeSetter } from '../services/store'
import { expandGet, expandSync, expandCall } from '../services/wildcards'
import { makePaths } from '../services/paths'
import { getStore } from './vuex'

// -------------------------------------------------------------------------------------------------------------------
// entry
// -------------------------------------------------------------------------------------------------------------------

export function get (path, props, useComputed = true) {
  const store = getStore()
  return make(path, props, getOne, function (path) {
    return expandGet(path, store.state, store.getters)
  }, useComputed)
}

export function sync (path, props, useComputed = true) {
  const store = getStore()
  return make(path, props, syncOne, function (path) {
    return expandSync(path, store.state)
  }, useComputed)
}

export function call (path, props) {
  const store = getStore()
  return make(path, props, callOne, function (path) {
    return expandCall(path, store._actions)
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
 * @param   {boolean}               useComputed
 * @returns {{set, get}}                        a hash of Objects
 */
export function make (path, props, fnHandler, fnResolver, useComputed = false) {
  // expand path / props
  const data = makePaths(path, props, fnResolver)

  // handle single paths
  if (typeof data === 'string') {
    return useComputed
      ? computed(fnHandler(data))
      : fnHandler(data)
  }

  // handle multiple properties
  Object
    .keys(data)
    .forEach(key => {
      data[key] = useComputed
        ? computed(fnHandler(data[key]))
        : fnHandler(data[key])
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
  let getter, store
  return function (...args) {
    if (!getter || !store) {
      store = getStore()
      getter = makeGetter(store, path, stateOnly)
    }
    return getter.call(this, ...args)
  }
}

/**
 * Creates a single 1-way vue:vuex setter
 *
 * @param   {string}      path      a path to an action/commit reference
 * @returns {Function}              a single setter function
 */
export function setOne (path) {
  let setter, store
  return function (value) {
    if (!setter || !store) {
      store = getStore()
      setter = makeSetter(store, path)
    }
    // this.$nextTick(() => this.$emit('sync', path, value))
    return setter.call(this, value)
  }
}

/**
 * Creates a single action dispatcher
 *
 * @param   {string}      path      a path to an action/commit reference
 * @returns {Function}              a single setter function
 */
export function callOne (path) {
  const store = getStore()
  return function (value) {
    return store.dispatch(path, value)
  }
}
