import { state, getters, actions, clone } from './base'

/**
 * Vuex store
 *
 * - manual creation of all mutations
 * - sub-properties need handling separately
 */
const mutations = {
  SET_ITEMS (state, value) {
    state.items = value
  },

  SET_STATUS (state, value) {
    state.status = value
  },

  // complex properties require destructuring and assignment
  SET_SORT (state, {key, value}) {
    state.sort[key] = value
  },

  SET_FILTERS (state, {key, value}) {
    state.filters[key] = value
  },

}

export default {
  namespaced: true,
  state: clone(state),
  mutations,
  getters,
  actions,
}
