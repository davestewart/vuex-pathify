# Superstore

## Overview

Superstore is a Vuex plugin providing local storage hydration, sync and reset.

Setup is just a couple of lines of JavaScript, which then automatically:
 
 - saves state to local storage on any commit
 - loads state from local storage when the browser reloads

## Setup

Import the plugin, your modules, then set up your Vuex store with the Superstore `save()` and `load()` methods:


```ecmascript 6
// libraries
import Vuex from 'vuex'
import Superstore from 'vuex-superstore'

// import modules
import foo from './modules/foo'
import bar from './modules/bar'
import baz from './modules/baz'

// superstore
const superstore = new Superstore()

// vuex store
const store = new Vuex.Store({

  plugins: [superstore.save],

  modules: superstore.load({
    foo,
    bar,
    baz,
  }),

})
```

## Custom hydration

To run a custom hydration on the newly-loaded data, for example instantiating custom models instead of objects, add an additional function definition `hydrate()` to exported module definitions:

```ecmascript 6
// modules/foo.js

import Foo from 'models/Foo'

export default{
  state: {
    value: null
  },
  mutations: { ... },
  getters: { ... },
  actions: { ... },
  hydrate: function  (state) {
    if (state.value) {
      state.value = new Foo(state.value)
    }
  }
}
```
