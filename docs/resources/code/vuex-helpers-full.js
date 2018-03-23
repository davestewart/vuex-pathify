// store
const state = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz'
}

const getters = {
  foo: state => state.foo,

  bar: state => state.bar,

  baz: state => state.baz,
}

const actions = {
  setFoo: ({commit}, value) => {
    commit('SET_FOO', value)
  },

  setBar: ({commit}, value) => {
    commit('SET_BAR', value)
  },

  setBaz: ({commit}, value) => {
    commit('SET_BAZ', value)
  },
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
  actions,
  getters,
  mutations,
}

// view
import { mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters('example', [
      'foo',
      'bar',
      'baz'
    ])
  },

  methods: {
    ...mapActions('example', [
      'setFoo',
      'setBar',
      'setBaz'
    ])
  },
}
