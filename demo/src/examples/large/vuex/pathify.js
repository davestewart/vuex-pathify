import { make } from 'vuex-pathify'

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

const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  mutations
}
