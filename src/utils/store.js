import { getKeys, isPlainObject } from './object'

/**
 * Gets a Vuex accessor; a getter, mutator or action
 *
 * @param   {Object}  source  The accessor hash
 * @param   {string}  path    The path to the object; should be a slash-delimited string
 * @returns {Object}          An object containing various properties of the accessor
 */
export function getAccessor (source, path) {
  let target = null
  const keys = getKeys(path)
  keys.every(function (key, index) {
    const end = index + 1
    const type = keys.slice(0, end).join('/')
    if (type in source) {
      target = {
        value: source[type],
        type: type,
        module: keys.slice(0, index).join('/'),
        allKeys: keys.slice(index),
        subKeys: keys.slice(end),
      }
      return false
    }
    return true
  })
  return target
}

/**
 * Gets a value from an object, based on a path to the property, or if no path is passed
 *
 * @param   {Object}                obj     The Object to get the value from
 * @param   {string|Array|Object}  [path]   The optional path to a sub-property
 * @returns {*}
 */
export function getValue (obj, path, ...args) {
  let value = obj
  const keys = getKeys(path)
  keys.every(function (key) {
    const valid = isPlainObject(value) && value.hasOwnProperty(key)
    value = valid ? value[key] : void 0
    return valid
  })
  return value
}

/**
 * Sets a value on an object, based on a path to the property
 *
 * @param   {Object}                source  The Object to set the value on
 * @param   {string|Array|Object}   path    The path to a sub-property
 * @param   {*}                     value   The value to set
 * @returns {Object}                        The original source object
 */
export function setValue (source, path, value) {
  let key
  let keys = getKeys(path)
  let obj = source
  while (obj && keys.length > 1) {
    obj = obj[keys.shift()]
  }
  key = keys.shift()
  if (obj && obj.hasOwnProperty(key)) {
    obj[key] = value
  }
  return source
}