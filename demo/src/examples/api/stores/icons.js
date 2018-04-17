import Icon from '../classes/Icon'

/**
 * Icons Store
 *
 * This store manages a set of icons, but they could be anything; products, users, etc
 */
export default {
  namespaced: true,

  state: {
    data: [
      Icon.create(),
    ],
  },

  getters: {
    // return array of custom Icon classes
    data: state => state.data.map(icon => new Icon(icon))
  },

  actions: {
    addRandom ({commit}) {
      commit('ADD_ICON', Icon.create())
    },

    clear ({commit}) {
      commit('CLEAR')
    }
  },

  mutations: {
    ADD_ICON (state, icon) {
      state.data.push(icon)
    },

    CLEAR (state) {
      state.data = []
    }
  }
}
