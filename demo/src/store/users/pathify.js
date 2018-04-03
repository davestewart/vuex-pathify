import { make } from 'vuex-pathify'

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

const mutations = make.mutations(state)

const getters = {
  name: state => `${state.firstName} ${state.lastName}`
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
