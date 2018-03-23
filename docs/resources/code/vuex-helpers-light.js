// store
const state = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz'
}

const mutations = {
  SET_FOO: (state, value) => {
    state.foo = value
  },

  SET_BAR: (state, value) => {
    state.bar = value
  },

  SET_BAZ: (state, value) => {
    state.baz = value
  },
}

export default {
  state,
  mutations,
}

// view
import { mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState('example', [
      'foo',
      'bar',
      'baz'
    ])
  },

  methods: {
    ...mapMutations('example', [
      'SET_FOO',
      'SET_BAR',
      'SET_BAZ'
    ])
  },
}
