/**
 * Returns a boolean indicating whether the value is a plain Object
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is a true Object
 */
export function isPlainObject (value) {
  return isObject(value) && !Array.isArray(value)
}

/**
 * Returns a boolean indicating whether the value is an Object or Array
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is an Object or Array
 */
export function isObject (value) {
  return !!value && typeof value === 'object'
}

/**
 * Merge properties from a src object into a target object, optionally recursively
 *
 * Only copies values which exist in the target, so stale src objects don't overwrite fresh target objects
 *
 * Arrays are treated as values, so NOT iterated over / merged recursively.
 * This behaviour could be changed if required...
 *
 * @param   {Object}    trg     The object to have properties merged into it
 * @param   {Object}    src     The object from which to copy the properties
 * @param   {Boolean}  [deep]   An optional flag to deep-merge
 * @returns {Object}            The updated target object
 */
export function merge (trg, src, deep = false) {
  for (let name in trg) {
    if (isPlainObject(src) && src.hasOwnProperty(name)) {
      trg[name] = isPlainObject(trg[name]) && deep
        ? merge(trg[name], src[name])
        : trg[name] = src[name]
    }
  }
  return trg
}

/**
 * Gets keys from any value
 *
 * The function returns keys for various types:
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
 * Gets a value from an object, based on a path to the property, or if no path is passed
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
