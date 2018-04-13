import _ from 'lodash'

import { state, getters, actions } from './base'

import { make } from 'vuex-pathify'

export default {
  namespaced: true,
  state: _.clone(state),
  mutations: make.mutations(state),
  getters,
  actions,
}
