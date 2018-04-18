import Icon from '../classes/Icon'

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
