# Store accessors

> Store accessors provide root read / write access to the store

## Overview

The plugin adds accessors directly to the Vuex store instance, making it easy to get and set values from anywhere, even the console if the store is saved as a global variable:

```js
import store from 'store'
window.store = store
```
```console
store.set('settings/loaded', false)
```

See the [path syntax](/api/paths.md) page for details on compatible path syntax.

## API

!> The examples on this page use the [example](/resources/setup) setup and the [standard](/guide/mapping.md) mapping scheme

### Methods

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

Additionally, the path format works round the awkward syntax juggling required for Vuex modules; compare:

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
store.set('items', data)
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




### Errors

In the event that a supplied path does not map to a property, Vuex will log an error:

```js
store.set('blah', false)
```
```text
[Vuex Pathify] Unable to map path 'blah':
    - Did not find action 'setBlah' or mutation 'SET_BLAH' on store
    - Use path 'blah!' to target store member directly
```

As a developer you can update the path, or access the member **directly** (see below).


## Direct access

Pathify comes with two ways to get or set values **directly** in the store.

#### `Direct access syntax`

The first is to use [direct access syntax](/api/paths.md#direct-member-access) as discussed on the Paths API page. This **skips** automatic mapping, but does check the actions/mutations block or the getters/state blocks in order, so if you have **same-named** members, it will get the first one: 

```js
// read from the getter
store.get('filteredItems!') 

// call action directly
store.set('updateItems!', data)
```

#### `Vuex aliases`

The second method works only for setting data, and is to simple call the `commit()` or `dispatch()` directly.

You can do this in two ways; firstly, by accessing the store **directly**:

```js
// directly on the store
store.dispatch('updateItems', data)

// in a component, directly on the store
this.$store.dispatch('updateItems', data)
```

The second way is to use Pathify's Vuex **aliases**, which it wires up when you activate the plugin:

```js
// import 
import { commit, dispatch } from 'vuex-pathify'

// mutations
commit('UPDATE_ITEMS', data)

// actions
dispatch('updateItems', data)
```

Note that the aliases will work only on the **last** store registered in your application (this is probably 99% of apps) !

