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
    if (key in state.address) {
      state.address[key] = value
    }
  },

  SET_LINE1: (state, value) => {
    state.address.line1 = value
  },

  SET_LINE2: (state, value) => {
    state.address.line2 = value
  },

  SET_TOWN: (state, value) => {
    state.address.town = value
  },

  SET_POSTCODE: (state, value) => {
    state.address.postcode = value
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
