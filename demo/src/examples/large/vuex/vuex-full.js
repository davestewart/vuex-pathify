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

const getters = {
  firstName: state => state.firstName,

  lastName: state => state.lastName,

  email: state => state.email,

  website: state => state.website,

  phone: state => state.phone,

  street: state => state.street,

  area: state => state.area,

  town: state => state.town,

  zipcode: state => state.zipcode,

  country: state => state.country,

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

  setWebsite: ({ commit }, value) => {
    commit('SET_WEBSITE', value)
  },

  setPhone: ({ commit }, value) => {
    commit('SET_PHONE', value)
  },

  setStreet: ({ commit }, value) => {
    commit('SET_STREET', value)
  },

  setArea: ({ commit }, value) => {
    commit('SET_AREA', value)
  },

  setTown: ({ commit }, value) => {
    commit('SET_TOWN', value)
  },

  setZipcode: ({ commit }, value) => {
    commit('SET_ZIPCODE', value)
  },

  setCountry: ({ commit }, value) => {
    commit('SET_COUNTRY', value)
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
