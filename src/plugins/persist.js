const storage = window.localStorage

import { merge } from '../utils/object'

export const defaults = {
  key: 'vuex'
}

function getData (state, save) {
  // ask module to filter state
  if (save instanceof Function) {
    return save(state)
  }

  // save only keys of state
  else if (Array.isArray(save)) {
    return save
      .reduce((output, key) => {
        output[key] = state[key]
        return output
      }, {})
  }

  // save entire state
  else if (save === true) {
    return state
  }
}

/**
 * Storage helper to load, save and remove state from local storage
 *
 * @param   {Vuex}    store
 */
export default function (store) {

  const { key } = defaults

  // module callbacks
  const children = store._modules.root._children
  const callbacks = Object
    .keys(children)
    .reduce((callbacks, key) => {
      callbacks[key] = children[key]._rawModule.save
      return callbacks
    }, {})

  // root callback
  callbacks._root = store._modules.root._rawModule.save

  /**
   * Save data to local storage
   *
   * @param {{type:string, payload:*}}  mutation    The type (path) and payload (value) of the mutation
   * @param {Object}                    state       The store state
   */
  function save (mutation, state) {
    // variables
    const output = {}
    const root = {}

    // loop over state
    Object
      .keys(state)
      .reduce((output, name) => {
        // modules
        if (name in callbacks) {
          const data = getData(state[name], callbacks[name])
          if (data) {
            output[name] = data
          }
        }

        // root
        else {
          root[name] = state[name]
        }

        // return
        return output
      }, output)

    // collate root
    const data = getData(root, callbacks._root)
    if (data) {
      Object.assign(output, data)
    }

    storage.setItem(key, JSON.stringify(output))
  }

  /**
   * Load local data
   */
  function load () {
    const values = JSON.parse(storage.getItem(key) || '{}')
    const state = merge(store.state, values, true)
    store.replaceState(state)
  }

  store.subscribe(save)
  load()
}
