# Store accessors

> Store accessors provide simple read / write access directly on the store

## Overview

The plugin adds accessor methods directly to the Vuex store instance.

The methods:

- use Pathify's [path syntax](/api/paths.md) to reference modules, properties and sub-properties
- implement [accessor priority](/api/properties.md#accessor-priority), simplifying the overall set/get interface
- couple with [store helpers](/api/store.md) to provide full sub-property read/write


## Usage

Once [configured](/guide/config.md), getting and setting values on the store is simple: 

```js
store.set('products/filters@sort.order', 'asc')
```

You can get and set values from anywhere, even the console (which is great for debugging!):

```js
import store from 'store'
window.store = store
```
```console
store.set('settings/loaded', false)
```

See the [interactive demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo?initialpath=api/accessors) for live examples.

## API

### Methods

Remember that store accessors use Pathify's core [property access](/api/properties.md) so have exactly the same functionality.

#### `get(path: string): *`

The `get()` method reads values from the getters or state:

```js
// 'shoes'
store.get('category')
```
```js
// 'red'
store.get('filters@search')
```

#### `set(path: string, value: *): *`

The `set()` method writes values via actions or mutations:

```js
store.set('category', 'bags')
```
```js
store.set('filters@sort.order', 'desc')
```

The result of both calls is returned, so if you're expecting a Promise, you can continue when it resolves:

```js
store
  .set('items', data)
  .then(console.log)
```



#### `copy(path: string): *`

The `copy()` method clones and returns a non-reactive copy of the values in the store.

```js
// {key: "bags", order: "asc"} 
copy('sort')
```
```js
// rather than {__ob__: Observer}
```

