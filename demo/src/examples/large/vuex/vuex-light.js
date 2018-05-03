const state = {
  firstName: 'Joe',
  lastName: 'Bloggs',
  email: 'joe@bloggs.com',
  website: 'www.bloggs.com',
  phone: '0123 456 789',
  street: '123 Some Street',
  area: 'Some Area',
  town: 'Some Town',
  zipcode: '12345',
  country: 'Some Country',
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

  SET_STREET: (state, value) => {
    state.street = value
  },

  SET_AREA: (state, value) => {
    state.area = value
  },

  SET_TOWN: (state, value) => {
    state.town = value
  },

  SET_ZIPCODE: (state, value) => {
    state.zipcode = value
  },

  SET_COUNTRY: (state, value) => {
    state.country = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
