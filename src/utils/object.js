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
 * Tests whether a string is numeric
 *
 * @param   {string|number}   value   The value to be assessed
 * @returns {boolean}
 */
export function isNumeric (value) {
  return typeof value === 'number' || /^\d+$/.test(value)
}

/**
 * Tests whether a passed value is an Object and has the specified key
 *
 * @param   {Object}   obj    The source object
 * @param   {string}   key    The key to check that exists
 * @returns {boolean}         Whether the predicate is satisfied
 */
export function hasKey (obj, key) {
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
          ? value.match(/[-$\w]+/g) || []
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
    const valid = isObject(value) && value.hasOwnProperty(key)
    value = valid ? value[key] : void 0
    return valid
  })
  return value
}

/**
 * Sets a value on an object, based on a path to the property
 *
 * @param   {Object}                obj       The Object to set the value on
 * @param   {string|Array|Object}   path      The path to a sub-property
 * @param   {*}                     value     The value to set
 * @param   {boolean}              [create]   Optional flag to create sub-properties; defaults to false
 * @returns {Boolean}                         True or false, depending if value was set
 */
export function setValue (obj, path, value, create = false) {
  const keys = getKeys(path)
  return keys.reduce((obj, key, index) => {
    // early return if no object
    if (!obj) {
      return false
    }

    // convert key to index if obj is an array and key is numeric
    if (Array.isArray(obj) && isNumeric(key)) {
      key = parseInt(key)
    }

    // if we're at the end of the path, set the value
    if (index === keys.length - 1) {
      obj[key] = value
      return true
    }

    // if the target property doesn't exist...
    else if (!isObject(obj[key]) || !(key in obj)) {
      // ...create one, or cancel
      if (create) {
        // create object or array, depending on next key
        obj[key] = isNumeric(keys[index + 1])
          ? []
          : {}
      }
      else {
        return false
      }
    }

    // if we get here, return the target property
    return obj[key]
  }, obj)
}

/**
 * Checks an object has a property, based on a path to the property
 *
 * @param   {Object}                obj     The Object to check the value on
 * @param   {string|Array|Object}   path    The path to a sub-property
 * @returns {boolean}                       Boolean true or false
 */
export function hasValue (obj, path) {
  let keys = getKeys(path)
  if (isObject(obj)) {
    while (keys.length) {
      let key = keys.shift()
      if (hasKey(obj, key)) {
        obj = obj[key]
      }
      else {
        return false
      }
    }
    return true
  }
  return false
}

export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}
