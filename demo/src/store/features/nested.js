export default {

  state: {
    value: 'hello from root',
  },

  getters: {
    value (state) {
      return String(state.value).toUpperCase()
    }
  },

  mutations: {
    SET_VALUE (state, value) {
      state.value = value
    }
  }
}
