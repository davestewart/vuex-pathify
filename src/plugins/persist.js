const storage = window.localStorage

import { merge } from '../utils/object'

const defaults = {
  key: 'vuex'
}

/**
 * Storage helper to load, save and remove state from local storage
 *
 * @param   {Vuex}    store
 * @param   {object}  options
 */
export default function (store, { key } = defaults) {

  /**
   * Save data to local storage
   *
   * @param {{type:string, payload:*}}  mutation    The type (path) and payload (value) of the mutation
   * @param {Object}                    state       The store state
   */
  function save (mutation, state) {
    // TODO implement save function
    // TODO look at filters
    storage.setItem(key, JSON.stringify(state))
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
