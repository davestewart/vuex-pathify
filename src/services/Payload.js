import { setValue } from '../utils/object'

/**
 * Payload class to facilitate the setting of sub-properties on the store
 */
export class Payload {
  constructor (path, value) {
    this.path = path
    this.value = value
  }
}

Payload.prototype.setValue = function (state) {
  setValue(state, this.path, this.value)
}
