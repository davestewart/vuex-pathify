import _ from 'lodash'

import { state, getters, actions } from './base'

import { make } from 'vuex-pathify'

/**
 * Pathify store
 *
 * Contains only make.mutations()
 */
export default {
  namespaced: true,
  state: _.clone(state),
  mutations: make.mutations(state),
  getters,
  actions,
}
