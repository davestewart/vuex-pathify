/**
 * @module
 * @description Decorators for Vuex Pathify component helpers
 *
 * For example:
 * ```js
 * @Component
 * class MyComponent extends Vue {
 *   @Get('name')
 *   @Set('name')
 *   @Call('setName')
 * }
 * ```
 */

import { call, get, sync } from './component'
import { createDecorator } from 'vue-class-component'

/**
 * Decorator for `get` component helper.
 * @param   {string}          path    The path to store property
 * @returns {VueDecorator}            Vue decorator to be used in Vue class component.
 */
function Get (path) {
  if (typeof path !== 'string' || arguments.length > 1) { throw new Error('Property decorators can only be used for single property access') }
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}
    options.computed[key] = get(path)
  })
}

/**
 * Decorator for `sync` component helper.
 * @param   {string}          path    The path to store property
 * @returns {VueDecorator}            Vue decorator to be used in Vue class component.
 */
function Sync (path) {
  if (typeof path !== 'string' || arguments.length > 1) { throw new Error('Property decorators can only be used for single property access') }
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}
    options.computed[key] = sync(path)
  })
}

/**
 * Decorator for `call` component helper.
 * @param   {string}          path    The path to store property
 * @returns {VueDecorator}            Vue decorator to be used in Vue class component.
 */
function Call (path) {
  if (typeof path !== 'string' || arguments.length > 1) { throw new Error('Property decorators can only be used for single property access') }
  return createDecorator((options, key) => {
    if (!options.methods) options.methods = {}
    options.methods[key] = call(path)
  })
}

export { Get, Sync, Call }
