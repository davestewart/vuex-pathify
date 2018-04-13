const state = {
  firstName: 'Joe',
  lastName: 'Bloggs',
  email: 'joe@bloggs.com',
  website: 'www.bloggs.com',
  phone: '0123 456 789',
  address: {
    line1: '123 Some Street',
    line2: 'Somewhere',
    town: 'Sometown',
    zipcode: '12345',
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

  SET_WEBSITE: (state, value) => {
    state.website = value
  },

  SET_PHONE: (state, value) => {
    state.phone = value
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

  SET_ZIPCODE: (state, value) => {
    state.address.zipcode = value
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
