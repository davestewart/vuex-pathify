import { state, getters, actions, clone } from './base'

import { make } from 'vuex-pathify'

/**
 * Pathify store
 *
 * - mutations created via make.mutations()
 */
const mutations = make.mutations(state)

export default {
  namespaced: true,
  state: clone(state),
  mutations,
  getters,
  actions,
}
