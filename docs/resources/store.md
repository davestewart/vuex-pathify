# Example store

> An example store setup

## Overview

To illustrate the examples in the API section, we'll use the following example store:

```js
// store.js

import { makeMutations } from 'vuex-pathify'
import Item from './Item'

const state = {
    items: [],
    category: 'shapes',
    filters: {
        search: 'circle' ,
        sort: {
            key: 'id',
            order: 'asc',
        }
    }
}

const mutations = {
  
  // core mutations
  ...makeMutations(state),
  
  // additional mutations
  APPEND_ITEMS (state, items) {
        state.items = [...state.items, ...items]
    }
}

const getters = {
    items (state) {
        return state.items.map(item => new Item(item))
    },
    
    filteredItems (state) {
        return state.items.map(item => new Item(item))
    }
}

const actions = {
    // simulate load
    loadItems ({dispatch}, page) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const items = [
                    {id: 1, sides: 1,  name: 'circle', color: 'red'}, 
                    {id: 2, sides: 3,  name: 'triangle', color: 'blue'}, 
                    {id: 3, sides: 4,  name: 'square', color: 'red'}
                ]
                dispatch('appendItems', items)
                resolve(items)
            }, 1000)
        })
    },
    
    // append, rather than set items
    appendItems ({commit}, items) {
        commit('APPEND_ITEMS', items)
    }
}

export default {
    state,
    mutations: 
    getters,
    actions
}
```

The following helper class is also used.

```js
// Item.js

export default function Item (data) {
  Object.assign(this, data)
}

Item.prototype = {
    getName () {
        return this.name.toUpperCase()
    }
}
```
