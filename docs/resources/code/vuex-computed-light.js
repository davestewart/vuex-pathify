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
export default {
  computed: {
    foo: {
      get () {
        return this.$store.state.example.foo
      },

      set (value) {
        this.$store.commit('example/SET_FOO', value)
      }
    },

    bar: {
      get () {
        return this.$store.state.example.bar
      },

      set (value) {
        this.$store.commit('example/SET_BAR', value)
      }
    },

    baz: {
      get () {
        return this.$store.state.example.baz
      },

      set (value) {
        this.$store.commit('example/SET_BAZ', value)
      }
    },
  },
}
