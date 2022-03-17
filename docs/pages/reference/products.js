// pathify
import { make } from 'vuex-pathify'

// local files
import { sort } from '../utils'
import Api from '../services/Api'
import Item from '../classes/Item'

// base state
const state = {
  items: [],
  status: '',
  filters: {
    search: '',
    sort: {
      order: 'asc',
      key: 'id',
    }
  }
}

// getter overrides
const getters = {
  // return Item instances
  items: (state) => state.items.map(data => new Item(data)),

  // getter value
  filteredItems (state, getters) {
    return getters.items
      .filter(item => item.title.includes(state.filters.search))
      .sort(sort(state.filters.sort))
  },

  // custom getter function
  filterBy (state, getters) {
    return function (key, value) {
      return getters.items
        .filter(item => item[key] === value)
        .sort(sort(state.filters.sort))
    }
  }
}

// automatically generate mutations
const mutations = make.mutations (state)

// manually-created actions
const actions = {
  // load items
  load ({ commit }) {
    commit('SET_STATUS', 'loading')
    Api
      .get('items')
      .then(data => {
        commit('SET_STATUS', '')
        commit('SET_ITEMS', data)
      })
      .catch(err => commit('SET_STATUS', err.message))
  },

  // manually update items
  update ({commit}, items) {
    // convert input to raw data
    const data = items.map(item => Object.assign({}, item))
    commit('SET_ITEMS', data)
  }
}

// export store
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
