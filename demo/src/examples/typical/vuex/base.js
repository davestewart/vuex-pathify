import _ from 'lodash'
import axios from 'axios'

import Repo from '../../../examples/typical/ui/Repo'

/*
Base store for all comparisons

Contains:

  - state
  - getters
  - API calls
*/

export function clone (value) {
  return _.cloneDeep(value)
}

export const state = {
  items: [],
  status: '',
  sort: {
    key: 'stars',
    order: 'desc',
  },
  filters: {
    language: 'JavaScript',
    type: '',
    keyword: '',
  }
}

export const getters = {
  // return array of Repo classes, based on state
  items (state) {
    return state.items
      .map(item => new Repo(item))
  },

  filteredItems (state, getters) {
    return _
      .orderBy(getters.items, state.sort.key, state.sort.order)
      .filter(item => item.contains(state.filters.keyword))
  },
}

export const actions = {
  load ({ state, commit }) {
    commit('SET_STATUS', `Loading ${state.filters.language} repositories...`)
    const query = `${state.filters.type}+language:${state.filters.language}&sort=${state.sort.key}`
    const url = `https://api.github.com/search/repositories?q=${query}`

    function update (items) {
      commit('SET_STATUS', '')
      commit('SET_ITEMS', items)
    }

    // return update(require('../../../assets/json/repositories.json').items)

    axios
      .get(url).then(res => {
        update(res.data.items)
      })
      .catch(err => {
        console.log(err)
        commit('SET_STATUS', err.response.data.message)
      })
  }

}
