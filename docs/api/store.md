# Store helpers


> Store helpers eliminate store boilerplate

### Overview

Stores generally have a lot of boilerplate. Consider a typical store, perhaps to browse products:

```js
const state = {
    items: [ ... ],
    itemId: null,
    pagination: { ... },
    search: '',
    sort: {
        key: 'id',
        order: 'ASC'
    }
}
```

Depending on your development preferences, you'll have to:

- create mutations to gain write access

The `mutations` for most of these will be fairly redundant "set state" functions, with the exception of the `pagination` and `search` properties which will require some additional gymnastics to set sub-properties.

Use the `makeMutations` helper to so all this in one line, including full sub-property access via Pathify path syntax, i.e. `products@sort.key`:

### Mutation generation

Use `makeMutations` to build all `mutations` with transparent support for `@subproperty` access: 

```js
const mutations = makeMutations(state)
```

You can selectively pick properties, and mix them in using destructuring as required:

```js
const mutations =  {
    ...makeMutations(state, ['foo', 'bar']),
    
    // add additional functions here...
}
```

### Getters and actions generation

The package also includes `makeGetters` and `makeActions` ...

```
const getters = makeGetters(state)
const actions = makeActions(state)
```

... though the requirement for explicit `getters` and `actions` is somewhat redundant seeing as Pathify manages this access for you.


View [store setup](docs/discussion/code-comparisons.md#store-setup) comparisons here.


## Overview

**Store helpers exist to remove boilerplate.**

Consider a typical store, perhaps to browse products:

```js
const state = {
    items: [ ... ],
    itemId: null,
    pagination: { ... },
    search: '',
    sort: {
        key: 'id',
        order: 'ASC'
    }
}
```

Depending on your development preferences, you'll have to at leas

The `mutations` for most of these will be fairly redundant "set state" functions, with the exception of the `pagination` and `search` properties which will require some additional gymnastics to set sub-properties.

Use the `makeMutations` helper to so all this in one line, including full sub-property access via Pathify path syntax, i.e. `products@sort.key`:

```js
const mutations =  {
    // all properties
    ...makeMutations(state)
    
    // customise search
    search (state, value) => state.search = value.trim()
}
```

The package also includes `makeGetters` and `makeActions` for those who still want or need explicit wiring.


To use the helpers in components and stores, import and use them as required:

```js
// store
import { makeMutations, makeGetters, makeActions } from 'vuex-pathify
```
```js
// components
import { get, set, sync, getSome, syncSome } from 'vuex-pathify
```

Additionally, Vuex's `commit` and `dispatch` are aliased for importing convenience for when you don't want to (or can't) use automatic member resolution:

```js
// components
import { sync, commit, dispatch } from 'vuex-pathify
```
