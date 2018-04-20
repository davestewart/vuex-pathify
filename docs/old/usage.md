# Basic usage

> An example store and component demoing key features with minimal code

This page demonstrates a non-trivial **store** and **component** setup, to show just how little boilerplate and wiring Pathify requires in the real world.


<img class="indent" src="https://user-images.githubusercontent.com/132681/37315467-d3ab093e-2651-11e8-9603-7b908bebaf0f.png">

## Store

This store file demonstrates:

- sub-property organisation in the `personal` node
- automatic `mutations` creation using `makeMutations()`
- a manually-created `getter` property, named `name`
- Vuex namespaced module format accessible via `user/`

The code is:

```js
import { makeMutations } from 'vuex-pathify'

const state = {
  firstName: 'Joe',
  lastName: 'Bloggs',
  email: 'joe@hotmail.com',
  personal: {
    height: 180,
    age: 25,
  }
}

const mutations = makeMutations(state) // replaces boilerplate

const getters = {
  name: state => `${state.firstName} ${state.lastName}`
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
```
4pm dr linman
Note:

- absence of any store boilerplate
- lack of redundant `getters` or `actions`
- lack of specific sub-property mutation 

## Component

This component file demonstrates:

- the `get()` helper which pulls properties 1-way from the store
- the `sync()` helper which creates both single and multiple 2-way data-bindings with the store
    - `array` format which creates multiple 1:1 `name:property` mappings 
    - `object` format which creates multiple custom `name:property` mappings 
- sub-property access via Pathify's `@property` syntax

The code is:

```vue
<template>
  <div>
    <h2>{{ name }}</h2>
    <section>
      <label>First Name: <input v-model="firstName"></label>
      <label>Last Name: <input v-model="lastName"></label>
      <label>Email: <input v-model="email"></label>
      <label>Height: <input v-model.number="height"></label>
      <label>Age: <input v-model.number="age"></label>
    </section>
    <pre>{{ user }}</pre>
  </div>
</template>

<script>
  import { get, sync } from 'vuex-pathify'

  export default {
    computed: {
      user: get('user'),
      name: get('user/name'),
      ...sync('user', [
        'firstName',
        'lastName',
        'email',
      ]),
      ...sync('user/personal', {
        height: '@height',
        age: '@age',
      })
    },
  }
</script>

<style>
  label {
    display: block;
    width: 250px;
  }

  label > input {
    float: right;
  }
</style>
```

Note:

- Extremely lightweight component code
- No syntax juggling between `state` and `getters`; properties are resolved automatically
- Fully-automatic 2-way wiring; no need for:
    - `@input` handlers
    - `mapMutations` or `mapActions` helpers
    - compound property blocks
    - manual `commit()` calls
- no manual management of store sub properties




