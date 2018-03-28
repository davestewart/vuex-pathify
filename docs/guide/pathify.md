# Pathify 101

> An overview of Pathify in less than 30 seconds

## Overview

Pathify **simplifies** Vuex by abstracting its various syntaxes and methods to **a unified, state-based, path syntax**:

```
products/items@filters.search
```

You use store decorators and helper functions to get and set values:

```js
const items = store.get('products/items')
```
```js
computed: {
  items: sync('products/items')
}
```

You use store helpers to replace boilerplate for mutations, getters and actions:

```js
const mutations = make.mutations(state)
```

Behind the scenes, Pathify programmatically [maps](/discussion/algorithm.md) paths to and from store members or operations:

```js
Pathify                                     Vuex
      
store.get('products/items')           <-    store.state.products.items
                                            store.getters['products/items']
store.set('products/items', items)    ->    commit('products/SET_ITEMS', items)
                                            dispatch('products/setItems', items)
```
The result is a significant simplification of Vuex's API:
 
- from **4** operations, **4** helpers, **3** accessor syntaxes and **3** naming formats
- to **3** methods and **1** path format

## Summary

A final look at Pathify's core features:

- unified, state-based, path format
- simplified store member access
- transparent sub-property access
- one-liner component data-binding
- one-liner boilerplate generation
- massive reduction in lines of code
