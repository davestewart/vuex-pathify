import factory from '../icons/factory'

/**
 * Icons Store
 *
 * This store manages a set of icons, but they could be anything; products, users, etc
 */
export default {
  namespaced: true,

  state: {
    style: 'line',
    data: [
      factory.getData(),
    ],
  },

  getters: {
    // return array of custom Icon classes
    data: state => state.data.map(icon => factory.create(icon.name, icon.color))
  },

  actions: {
    addRandom ({commit}) {
      commit('ADD_ICON', factory.getData())
    },

    clear ({commit}) {
      commit('CLEAR')
    }
  },

  mutations: {
    SET_STYLE (state, style) {
      state.style = style
    },

    ADD_ICON (state, icon) {
      state.data.push(icon)
    },

    CLEAR (state) {
      state.data = []
    }
  }
}
