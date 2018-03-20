# Store accessors

> Store accessors provide root read / write access to the store

## Overview

The plugin adds methods directly to the Vuex store instance, making it easy to get and set values from anywhere, even the console if the store is saved as a global variable:

```js
import store from 'store'
window.store = store
```
```console
store.set('settings/loaded', false)
```

To illustrate the examples on this page, we'll use the following example store:

```js
import { makeMutations } from 'vuex-pathify'

const state = {
    items: [ ... ],
    category: 'shoes',
    filters: {
        search: 'red',
        sort: {
            key: 'id',
            order: 'asc',
        }
    }
}

export default {
    state,
    mutations: makeMutations(state)
    getters: {
        items (state) {
            return state.items.map(item => new Item(item))
        }
    }
}
```

See the [path syntax](/api/paths.md) page for details on compatible path syntax.

## Methods

!> Examples on this page use the [common](/guide/resolvers.md) naming preset

#### `get(path: string): *`

The `get()` method reads values from the store. 

```js
// 'shoes'
store.get('category')
```
```js
// 'red'
store.get('filters@search')
```

Crucially, the method prioritises `getters` over `state`, which serves two purposes:

1. Reduces the decision making process outside of the store; you want a value, you just **ask for it**
2. Supports a pattern where a **same-named** `getter` can return **transformed** items whilst keeping the raw `state` untouched:

```js
// Item[] - not Object[]
store.get('items')
```
To access the raw state, just access the store directly:

```js
store.state.items
```

Additionally, the path format works round the awkward syntax juggling required for Vuex modules:

```js
// single, unified format
store.get('products/items')
```
```js
store.state.products.items
store.getters['products/items']
```


#### `set(path: string, value: *): *`

The `set()` method writes values to the store:

```js
store.set('category', 'bags')
```
```js
store.set('filters@sort.order', 'desc')
```

Crucially, the method prioritises `actions` over `mutations`, which reduces the decision making process outside of the store; you want to update a value, you just **set it**:

```js
// single, unified format
store.set('items')
```

Behind the scenes:

- if a related `action` is found, `dispatch()` is called
- if a related `mutation` is found, `commit()` is called

The result of both calls is returned, so if the `action` returned a Promise, code can continue when it resolves:

```js
store
  .set('items', data)
  .then(console.log)
```

As with `get()` call methods directly if you need to:

```js
store.set('updateItems!', data)
store.commit('updateItems', data)
```




#### `copy(path: string): *`

The `copy()` method clones and returns a copy of the values in the store.

```js
// Object[]
copy('items')
```




## Errors

In the event that a supplied path does not resolve to a property, Vuex will log an error:

```js
store.set('blah', false)
```
```text
[Vuex Pathify] Unable to resolve path 'blah':
    - Did not find action 'setBlah' or mutation 'SET_BLAH' on store
    - Use path 'blah!' to target store member directly
```

As a developer you can update the path, or if the member exists in an upmappable form, access the member [directly](/api/paths.md#direct-member-access):


```js
store.set('updateBlah!', value)
store.commit('updateBlah', value)
```




