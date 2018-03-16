## Implementation

Computed property helpers abstract away Vuex project implementation details:

- `get()` - 1-way get from getters or state
- `sync()` - 2-way sync from getters or state / actions or commits

A Vuex plugin, abstracts away the same details on the store itself:

- `$store.get()` - directly pull from a getter or state
- `$store.set()` - directly call an action or commit

Store helpers avoid boilerplate in your store definitions:

- `makeGetters()` - auto-create getters from state
- `makeMutations()` - auto-create mutators from state



## Core API

### Overview

By way of the `accessors` plugin, the Vuex Helpers package provides intuitive access to the store, including sub properties, via simple path access.



### How it works

```txt
application    accessors     module      property



```



The package's main API provides core `get()` and `set()` methods to access the main Vuex store.

Additionally, it extends the main `$store` instance with these methods so you can write simple code like this:

```js
// get a

value = store.get('module/prop/nested/value')

```


