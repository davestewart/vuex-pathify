// store
import { make } from 'vuex-pathify'

const state = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz'
}

const mutations = make.mutations(state)
const actions = make.actions(state)
const getters = make.getters(state)

export default {
  state,
  mutations,
  actions,
  getters,
}

// view
import { sync } from 'vuex-pathify'

export default {
  computed: sync('example/*')
}
