import _ from 'lodash'

import { state, getters, actions } from './base'

/**
 * Vuex store
 *
 * Requires manual creation of all mutations:
 *
 * - simple
 */
const mutations = {
  SET_ITEMS (state, value) {
    state.items = value
  },

  SET_STATUS (state, value) {
    state.status = value
  },

  // complex properties require destructuring and manual assignment
  SET_SORT (state, {key, value}) {
    state.sort[key] = value
  },

  SET_FILTERS (state, {key, value}) {
    state.filters[key] = value
  },

}

export default {
  namespaced: true,
  state: _.clone(state),
  mutations,
  getters,
  actions,
}
