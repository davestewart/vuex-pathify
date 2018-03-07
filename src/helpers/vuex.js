const vuex = {
  store: {
    commit () {
      console.warn('[Vuex Pathify]: Plugin not initialized!')
    },

    dispatch () {
      console.warn('[Vuex Pathify]: Plugin not initialized!')
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
