// store
import { make } from 'vuex-pathify'

const state = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz'
}

const mutations = make.mutations(state)

export default {
  state,
  mutations,
}

// view
import { sync } from 'vuex-pathify'

export default {
  computed: sync('example/*')
}
