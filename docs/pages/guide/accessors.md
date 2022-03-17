# Store accessors

> Store accessors provide simple read / write access directly on the store

## Overview

The plugin adds accessor methods directly to the Vuex store instance.

The methods:

- use Pathify's [path syntax](/guide/paths.md) to reference modules, properties and sub-properties
- implement [accessor priority](/guide/properties.md#accessor-priority), simplifying the overall set/get interface
- couple with [store helpers](/guide/store.md) to provide full sub-property read/write


## Usage

Once [configured](/setup/config.md), getting and setting values on the store is simple: 

```js
store.set('filters@sort.order', 'asc')
```

You can get and set values from anywhere, even the console (which is great for debugging!):

```js
import store from 'store'
window.store = store
```
```console
store.set('filters@search', 'widgets')
```

See the store accessors [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=api/accessors) for an editable, live example.

## API

### Methods

Remember that store accessors use Pathify's core [property access](/guide/properties.md) so have exactly the same functionality.

#### `get(path: string): *`

The `get()` method reads values from the getters or state:

```js
// 'loading'
store.get('status')
```
```js
// 'asc'
store.get('filters@sort.order')
```

If the path references a store [getter function](https://vuex.vuejs.org/en/getters.html#method-style-access), pass additional arguments as required:

```js
const bags = store.get('filterBy', 'category', 'bag')
```

#### `set(path: string, value: *): *`

The `set()` method writes values via actions or mutations:

```js
store.set('status', 'error')
```
```js
store.set('filters@sort.order', 'desc')
```

Note that `set()` returns the result of the operation so if you're expecting a Promise, you can continue when it resolves:

```js
store
  .set('items', data)
  .then(console.log)
```



#### `copy(path: string): *`

The `copy()` method clones and returns a non-reactive copy of the values in the store.

```js
// { key: "id", order: "asc" } 
copy('sort')
```
```js
// rather than {__ob__: Observer}
```

