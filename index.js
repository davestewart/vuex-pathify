const storage = window.localStorage

function load (key) {
  return JSON.parse(storage.getItem(key) || '{}')
}

/**
 * Vuex plugin to hydrate, sync and clear state to/from local storage
 *
 * @param   {string}  key   An optional local storage item name
 */
function Superstore (key = 'vuex') {

  Object.assign(this, {

    /**
     * Load data from local storage and hydrate module states
     *
     * @param   {Object}  modules   The hash of module definitions
     * @returns {Object}            The updated modules
     */
    load (modules) {
      const states = load(key)
      Object
        .keys(modules)
        .forEach(name => {
          const module = modules[name]
          let state = states[name]
          if (module.state && state) {
            if (module.hydrate instanceof Function) {
              module.hydrate(state)
            }
            Object.assign(module.state, state)
          }
        })
      return modules
    },

    /**
     * Vuex mutation handler; assign to Store plugins array
     *
     * @param   {Object}  store     The store to save to local storage
     */
    save (store) {
      store.subscribe((mutation, state) => {
        storage.setItem(key, JSON.stringify(state))
      })
    },

    /**
     * Clear stored data
     */
    clear () {
      storage.removeItem(key)
    },
  })
}

export default Superstore
