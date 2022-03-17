# API

> Pathify's full API

Whilst the guide deep-dives to explain how Pathify works, this section is just a high-level reference to the code:

- [Store Helpers](#store-helpers)<br>
  Automatically generate mutations, getters, or actions from state
- [Store Accessors](#store-accessors)<br>
  Get, set and copy data directly on the store
- [Component Helpers](#component-helpers)<br>
  Get, sync or call the vuex store from components
- [Class Component Decorators](#class-component-decorators)<br>
  Get, sync or call the vuex store from class components 
- [Vuex Helpers](#vuex-helpers)<br>
  Pathify versions of commit, dispatch or registerModule


## Store Helpers

> See the [guide](/guide/store) for more detailed information.

### `make.*`

Automatically generate `mutations`, `getters`, or `actions`:

```js
make.*(state: object | function | string[] | string)
```

The `state` parameter can be any of the following:

- your existing `state` (either an `object` or `function` returning an `object`)
- an `object` of keys
- an `array` of `string`s
- a space-separated `string` of keys


For example:

```js
import { make } from 'vuex-pathify'

const state = { a:1, b: 2 }
const mutations = make.mutations(state)
const actions = make.actions(state)
const getters = make.getters(state)

export default { state, mutations, actions, getters }
```

Each helper will return a hash of functions you can use directly or mix into exising Vuex members, i.e.:

```js
const mutations = {
  ...make.mutations(state),
  addToFoo: (state, value) => state.foo += value 
}
```

### `Payload`

The `Payload` class is used internally to signify to Pathify that sub-properties may be written to:

```js
new Payload(expr: string, path: string, value: *)
```

Generally you won't use it directly, but you can instantiate it if you need to:

```js
import { Payload } from 'vuex-pathify'
store.commit('filters', new Payload('filters', 'sort.order', 'asc'))
```

## Store Accessors

> See the [guide](/guide/accessors) for more detailed information.

Directly `get`, `set` and `copy` values on the root store instance.

### `store.get()`

Get a value directly from the store:

```js
store.get(path: string): *
```

For example:

```js
const order = store.get('products/filters@sort.order')
```

### `store.set()`

Set a value directly on the store:

```js
store.set(path: string, value: any): void
```

For example:

```js
store.get('products/filters@sort.order', 'asc')
```

### `store.copy()`

Copy a value directly from the store:

```js
store.copy(path: string): *
```

For example:

```js
const sort = store.copy('products/filters@sort')
```

## Component Helpers

> See the [guide](/guide/component) for more detailed information.

Wire component properties directly to the store.

### `component get()`

Wire one or more one-way (read) store properties to a component:

```js
get(path: string, string[] | Record<string, string>): *
```

For example:

```js
import { get } from 'vuex-pathify'
export default {
  computed: {
    items: get('products/items'),
    ...get('products/filters@sort', ['order', 'key']),
  }
}
```

### `component sync()`

Wire one or more two-way (read/write) store property to a component:

```js
sync(path: string, string[] | Record<string, string>)
```

For example:

```js
import { sync } from 'vuex-pathify'
export default {
  computed: {
    search: sync('products/search'),
    ...sync('products/filters@sort', ['order', 'key']),
  }
}
```

### `component call()`

Wire one or more store actions to a component:

```js
call(path: string, string[] | Record<string, string>)
```

For example:

```js
import { call } from 'vuex-pathify'
export default {
  methods: {
    load: call('products/load'),
    ...call('products', ['update']),
  }
}
```

## Class Component Decorators

> See the [guide](/guide/decorators) for more detailed information.

Single property access to be used with class based components.


### `class @Get()`

Wire a single one-way (read) store properties to a component:

```js
@Get(path: string): *
```

For example:

```js
import { Get } from 'vuex-pathify'

@Component
export default class Basket extends Vue {
  @Get('products/items') items
}
```
```ts
import { Get } from 'vuex-pathify'

@Component
export default class Basket extends Vue {
  @Get('products/items') items!: Item[]
}
```

### `class @Sync()`

Wire a single two-way (read/write) store property to a component:

```js
@Sync(path: string)
```

For example:

```js
import { Sync } from 'vuex-pathify'

@Component
export default class Basket extends Vue {
  @Sync('products/tax') tax
}
```
```ts
import { Sync } from 'vuex-pathify'

@Component
export default class Basket extends Vue {
  @Sync('products/tax') tax!: number
}
```
### `class @Call()`

Wire a single store actions to a component:

```js
@Call(path: string)
```

For example:

```js
import { Call } from 'vuex-pathify'

@Component
export default class Basket extends Vue {
  @Call('products/setDiscount') setDiscount
}
```
```ts
import { Call } from 'vuex-pathify'

@Component
export default class Basket extends Vue {
  @Call('products/setDiscount') setDiscount!: (rate: number) => any
}
```

## Vuex Helpers

Pathify exports various Vuex functions along with its own to make your imports a little cleaner.

### `commit()`

An alias to the Vuex `commit` method, so you can commit directly to the store:

```js
commit(path: string, value: *)
```

For example:

```js
import { commit } from 'vuex-pathify'

export default {
  methods: {
    addItem (item) {
      commit('products/item', item)
    }
  }
}
```

### `dispatch()`

An alias to the Vuex `dispatch` method, so you can dispatch directly to the store:

```js
dispatch(path: string, payload: *)
```


For example:

```js
import { dispatch } from 'vuex-pathify'

export default {
  methods: {
    addItem (item) {
      dispatch('products/addItem', item)
    }
  }
}
```

### `registerModule()`

Dynamically registers a new Vuex module during component creation:

```js
registerModule(path: string, module: Object, members: Function, options: Object)
```

For example:

```js
// imports
import { get, call, registerModule } from 'vuex-pathify'
import module from './store/user'

// callback to return lazily-executed Pathify helpers
const members = function () {
  return {
    computed: get('user/*'),
    methods: call('user/*')
  }
}

/**
 * User component definition
 */
export default {
  // extend from generated base class
  extend: registerModule('user', module, members),
}
```

For full usage, see [Dynamic module registration](/guide/component?id=registermodule).
