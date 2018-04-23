import { setValue } from '../utils/object'

/**
 * Handles passing and setting of sub-property values
 */
export default class Payload {
  constructor (path, value) {
    this.path = path
    this.value = value
  }

  /**
   * Set sub-property on target
   * @param target
   */
  update (target) {
    setValue(target, this.path, this.value)
  }
}
