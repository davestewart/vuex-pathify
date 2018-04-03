// store
const index = {
  state: {
    test: 'this is a test',
  },

  mutations: {
    SET_TEST (state, value) {
      state.test = value
    }
  },

  getters: {
    test (state) {
      return String(state.test).split('').reverse().join('')
    }
  },

  save: true
}
