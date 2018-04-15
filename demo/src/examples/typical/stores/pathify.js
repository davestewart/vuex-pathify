import { state, getters, actions, clone } from './base'

import { make } from 'vuex-pathify'

/**
 * Pathify store
 *
 * - mutations created via make.mutations()
 */
export default {
  namespaced: true,
  state: clone(state),
  mutations: make.mutations(state),
  getters,
  actions,
}
