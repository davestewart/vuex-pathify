import { isPlainObject, setValue } from '../utils/object'
import options from '../plugin/options'

/**
 * Handles passing and setting of sub-property values
 */
export default class Payload {
  constructor (expr, path, value) {
    this.expr = expr
    this.path = path
    this.value = value
  }

  /**
   * Set sub-property on target
   * @param target
   */
  update (target) {
    if (!options.deep) {
      console.error(`[Vuex Pathify] Unable to access sub-property for path '${this.expr}':
    - Set option 'deep' to 1 to allow it`)
      return target
    }

    const success = setValue(target, this.path, this.value, options.deep > 1)

    // unable to set sub-property
    if (!success && process.env.NODE_ENV !== 'production') {
      console.error(`[Vuex Pathify] Unable to create sub-property for path '${this.expr}':
    - Set option 'deep' to 2 to allow it`)
      return target
    }

    // set sub-property
    return Array.isArray(target)
      ? [].concat(target)
      : Object.assign({}, target)
  }
}

/**
 * Test if value is a serialized Payload
 *
 * @see https://github.com/davestewart/vuex-pathify/pull/125
 */
Payload.isSerialized = function (value) {
  return isPlainObject(value)
    && 'expr' in value
    && 'path' in value
    && 'value' in value
}
