const storage = window.localStorage

/**
 * Vuex plugin to hydrate, sync and clear state to/from local storage
 *
 * @param   {string}  key   An optional local storage item name
 */
function Superstore (key = 'vuex') {
  Object.assign(this, {

    /**
     * Load and return local data
     *
     * @returns {Object}
     */
    load () {
      return JSON.parse(storage.getItem(key) || '{}')
    },

    /**
     * Hydrate initial Vuex modules from local storage
     *
     * To hydrate custom classes within each module, add a custom hydrate() method
     * to each module's exported definition, and modify the passed state as required
     *
     * @param   {Object}  modules   The hash of Vuex modules
     * @returns {Object}
     */
    hydrate (modules) {
      const values = this.load()
      Object.keys(modules).forEach(name => {
        const module = modules[name]
        if ('state' in module && name in values) {
          if (module['hydrate'] instanceof Function) {
            values[name] = module.hydrate(values[name])
          }
          Object.assign(module.state, values[name])
        }
      })
      return modules
    },

    /**
     * Vuex mutation handler; assign to Store plugins array
     *
     * @param {Object} store  The store to save to local storage
     */
    save (store) {
      store.subscribe((mutation, state) => {
        storage.setItem(key, JSON.stringify(state))
      })
    },

    /**
     * Clear local storage data
     */
    clear () {
      storage.clear()
    },
  })
}

export default Superstore