import _ from 'lodash'

const state = {
  items: [],
  filters: {
    search: '',
    sort: {
      order: 1,
      key: 'id'
    }
  }
}

const getters = {
  filtered (state) {
    let items = state.items
    let filters = state.filters
    let search = filters.search

    if (search) {
      items = items
        .filter(item => {
          return Object
            .values(item)
            .some(value => value.includes(search))
        })
    }

    return _.sortBy(items, filters.sort.key, filters.sort.order)
  }
}
