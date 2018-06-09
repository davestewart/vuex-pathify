/**
 * Tests whether a passed value is an Object
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is a true Object
 */
export function isPlainObject (value) {
  return isObject(value) && !Array.isArray(value)
}

/**
 * Tests whether a passed value is an Object or Array
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is an Object or Array
 */
export function isObject (value) {
  return !!value && typeof value === 'object'
}

/**
 * Tests whether a passed value is an Object and has the specified key
 *
 * @param   {Object}   obj    The source object
 * @param   {string}   key    The key to check that exists
 * @returns {boolean}         Whether the predicate is satisfied
 */
export function hasKey(obj, key) {
  return isObject(obj) && key in obj
}

/**
 * Gets an array of keys from a value
 *
 * The function handles various types:
 *
 * - string - match all words
 * - object - return keys
 * - array  - return a string array of its values
 *
 * @param   {*}       value   The value to get keys from
 * @returns {Array}
 */
export function getKeys (value) {
  return !value
    ? []
    : Array.isArray(value)
      ? value.map(key => String(key))
      : typeof value === 'object'
        ? Object.keys(value)
        : typeof value === 'string'
          ? value.match(/\w+/g) || []
          : []
}

/**
 * Gets a value from an object, based on a path to the property
 *
 * @param   {Object}                obj     The Object to get the value from
 * @param   {string|Array|Object}  [path]   The optional path to a sub-property
 * @returns {*}
 */
export function getValue (obj, path) {
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
 * @param   {Object}                obj     The Object to set the value on
 * @param   {string|Array|Object}   path    The path to a sub-property
 * @param   {*}                     value   The value to set
 * @returns {Boolean}                       True or false, depending if value was set
 */
export function setValue (state, path, value, create = false) {
  const keys = path.split('.')
  return keys.reduce((obj, key, index)  => {
    if (!obj) {
      return false
    }
    else if (index === keys.length - 1) {
      obj[key] = value
      return true
    }
    else if (!isObject(obj[key]) || !(key in obj)) {
      if (create) {
        obj[key] = {}
      } else {
        return false
      }
    }
    return obj[key]
  }, state)
}

/**
 * Checks an object has a property, based on a path to the property
 *
 * @param   {Object}                obj     The Object to check the value on
 * @param   {string|Array|Object}   path    The path to a sub-property
 * @returns {boolean}                       Boolean true or false
 */
export function hasValue(obj, path) {
  let keys = getKeys(path)
  if (isObject(obj)) {
    while (keys.length) {
      let key = keys.shift()
      if (hasKey(obj, key)) {
        obj = obj[key]
      } else {
        return false
      }
    }
    return true
  }
  return false
}
