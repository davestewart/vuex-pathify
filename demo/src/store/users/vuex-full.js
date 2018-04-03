const state = {
  firstName: 'Joe',
  lastName: 'Bloggs',
  email: 'joe@bloggs.com',
  telephone: '020 0000 0000',
  mobile: '07900 000 000',
  address: {
    line1: '12 The Street',
    line2: 'The Area',
    town: 'The Town',
    postcode: 'AB12 3CD',
  }
}

const getters = {
  name: state => `${state.firstName} ${state.lastName}`,

  firstName: state => state.firstName,

  lastName: state => state.lastName,

  email: state => state.email,

  telephone: state => state.telephone,

  mobile: state => state.mobile,

  address: state => state.address,

  line1: state => state.line1,

  line2: state => state.line2,

  town: state => state.town,

  postcode: state => state.postcode,

}

const mutations = {
  SET_FIRST_NAME: (state, value) => {
    state.firstName = value
  },

  SET_LAST_NAME: (state, value) => {
    state.lastName = value
  },

  SET_EMAIL: (state, value) => {
    state.email = value
  },

  SET_TELEPHONE: (state, value) => {
    state.telephone = value
  },

  SET_MOBILE: (state, value) => {
    state.mobile = value
  },

  SET_ADDRESS: (state, value) => {
    state.address = value
  },

  SET_LINE1: (state, value) => {
    state.line1 = value
  },

  SET_LINE2: (state, value) => {
    state.line2 = value
  },

  SET_TOWN: (state, value) => {
    state.town = value
  },

  SET_POSTCODE: (state, value) => {
    state.postcode = value
  },

}

const actions = {
  setFirstName: ({ commit }, value) => {
    commit('SET_FIRST_NAME', value)
  },

  setLastName: ({ commit }, value) => {
    commit('SET_LAST_NAME', value)
  },

  setEmail: ({ commit }, value) => {
    commit('SET_EMAIL', value)
  },

  setTelephone: ({ commit }, value) => {
    commit('SET_TELEPHONE', value)
  },

  setMobile: ({ commit }, value) => {
    commit('SET_MOBILE', value)
  },

  setAddress: ({ commit }, value) => {
    commit('SET_ADDRESS', value)
  },

  setLine1: ({ commit }, value) => {
    commit('SET_LINE1', value)
  },

  setLine2: ({ commit }, value) => {
    commit('SET_LINE2', value)
  },

  setTown: ({ commit }, value) => {
    commit('SET_TOWN', value)
  },

  setPostcode: ({ commit }, value) => {
    commit('SET_POSTCODE', value)
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
