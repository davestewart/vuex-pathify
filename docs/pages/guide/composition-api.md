# Composition API

> Vue 3 compatibility

## Overview

Vue 3 brings with it the Composition API which is written in a fundamentally different manner to Vue 2's Options API.

In Vue 2 / Vuex 3, the store is referenced via the `$store` property on the Vue prototype, and computed properties are declared as methods in the `computed` block:

```js
// Options API
export default {
  computed: {
    items () {
      return this.$store.state.products.items
    }
  }
}
```

In Vue 3 / Vuex 4, the store is referenced using the `useStore` composition function, and computed properties are declared using the `computed` utility functions: 

```js
import { useStore } from 'vuex'

// Composition API
export default {
  setup () {
    const store = useStore()
    const items = computed(() => store.state.products.items)
    return {
      items
    }
  }
}
```

In Vue 3, Pathify's component helpers abstract away the complication using the same syntax as the previous version:

```js
import { get } from 'vuex-pathify'

export default {
  setup () {
    return {
      items: get('products/items')
    }
  }
}
```

## Setup

> See the [setup](/setup/config) section for more information

Setup Pathify in Vue 3 using the `createStore` method:

```js
import { createStore } from 'vuex'
import Pathify from 'vuex-pathify'

// options
Pathify.options.mapping = 'simple'

// plugin
export default createStore({
  plugins: [
    Pathify.plugin
  ],
  modules: { ... },
  ...
})
```

## API

> See the [API](/reference/api?id=component-helpers) and [guide](/guide/component) for more detailed information.

Pathify under Vue 3 works with both the Composition API and Options API, but defaults to the Composition API.

The format of the Component helpers is essentially the same as Vue 2 (with an optional flag for the Options API):

```js
get(path: string, properties?: string[] | Object, useComputed?: bool = true)
sync(path: string, properties?: string[] | Object, useComputed?: bool = true)
call(path: string, properties?: string[] | Object)
```

### Composition API

The Composition API requires computed properties to be declared in the setup lifecycle hook.

Here's how to do it using a setup function:

```js
import { get, sync } from 'vuex-pathify'

export default {
  setup () {
    return {
      items: get('products/items')
      search: sync('products/filters@search')
    }
  }
}
```

Here's how to do it using a setup script

```js
import { get, sync } from 'vuex-pathify'

const items = get('products/items')
const search = sync('products/filters@search')
```

To export multiple variables in a Setup Script, deconstruct the results of the `get`, `sync`, or `call` result:

```js
import { sync } from 'vuex-pathify'

const { key, order } = sync('products/filters@sort/*')
```

### Options API

If you prefer to use the Options API in Vue 3, you need to tell Pathify **not** to use the computed utility functions, by passing a final `false` argument to the helpers:

```js
import { get, sync } from 'vuex-pathify'

export default {
  computed: {
    // single property
    items: get('products/items', false)
    
    // multiple properties
    ...sync('products/filters@sort', ['key', 'order'], false)
  }
}
```
