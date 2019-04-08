/**
 * @module
 * @description Decorators for Vuex Pathify component helpers.
 * 
 * For example:
 * ```js
 * @Component
 * class MyComponent extends Vue {
 *   @Get("name")
 *   @Set("name")
 *   @Call("setName")
 * }
 * ```
 */

import { get, sync, call } from "./component"

let createDecorator = require('vue-class-component').createDecorator;

/**
 * Decortaor for `get` component helper.
 * @param   {string}          path - Path in store
 * @returns {VueDecorator}         - Vue decortaor to be used in cue class component.
 */
function Get(path) {
  if (typeof path !== 'string' || arguments.length > 1) { throw new Error('Property decorators can be used for single property access') }
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}
    options.computed[key] = get(path)
  })
}

/**
 * Decortaor for `sync` component helper.
 * @param   {string}          path - Path in store
 * @returns {VueDecorator}         - Vue decortaor to be used in cue class component.
 */
function Sync(path) {
  if (typeof path !== 'string' || arguments.length > 1) { throw new Error('Property decorators can be used for single property access') }
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}
    options.computed[key] = sync(path)
  })
}

/**
 * Decortaor for `call` component helper.
 * @param   {string}          path - Path in store
 * @returns {VueDecorator}  - Vue decortaor to be used in cue class component.
 */
function Call(path) {
  if (typeof path !== 'string' || arguments.length > 1) { throw new Error('Property decorators can be used for single property access') }
  return createDecorator((options, key) => {
    if (!options.methods) options.methods = {}
    options.methods[key] = call(path)
  })
}

export { Get, Sync, Call }
