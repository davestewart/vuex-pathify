const vuex = {
  /**
   * THIS OBJECT IS REPLACED AT RUNTIME WITH THE ACTUAL VUEX STORE
   */
  store: {
    state: null,

    commit () {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vuex Pathify] Plugin not initialized!')
      }
    },

    dispatch () {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vuex Pathify] Plugin not initialized!')
      }
    }
  }
}

export function commit(...args) {
  vuex.store.commit(...args)
}

export function dispatch(...args) {
  vuex.store.dispatch(...args)
}

export default vuex
