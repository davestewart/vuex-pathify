import { make } from 'vuex-pathify'

const state = {
  name: 'World',
}

// only making one mutation, but will make as many are there are state properties
const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  mutations,
}
