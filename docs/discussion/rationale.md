- 
- Really useful helpers to 

Additionally:

- you can still use Vuex directly



, the family of helpers and plugins are all refreshingly obvious; clear naming, obvious functionality, and some extra functionality you'll be glad was included. 

Superstore doesn't replace Vuex; behind the scenes `commit()`s are still made and `getters` are still accessed, additionally you can fall back to 

See the Rationale page for more information.


## Example

Package exports are designed so you can use as few or as many features as suit your project or workflow:

- want to minimise store boilerplate? Use `makeMutations()`
- can't remember if you're pulling from `state` or `getters`? Just call `get(...)`
- want to 2-way sync components without all the `commits()`? Use `sync(...)`
- want to treat all properties as paths? Just `access/them/like/this`
- want to reach into sub-properties? Enable `settings.deep`
- want to set values directly? Call `store.set(path, value)`
- want to grab initial values? Call `store.initial(...)`
- want to copy current values? Call `store.copy(...)`
- want to sync to local storage? Enable the `persist` plugin and add `save()` callbacks
- want to reset a module or the whole store? Call `store.reset(...)`

Easy, right?


The result of several large projects, Superstore is the result of working with Vuex on several big projects, and realising that a lot of the setup and wiring can be abstracted.

- rather than worrying about 4 ways to get and set data, you just manage 2
- rather than using 3 path targets or formats to access the store, you just use 1
- rather than using 3 different naming formats, you just use 1

 
The rationale is that state management shouldn't cause you to write more code than you need to. 

storing values shouldn't be complex.



- simplify the somewhat complex interface to Vuex
- abstract the complex wiring, especially in components
- provide a common property access
- write less, more obvious, co

Vuex Pathify is a package of **helpers**, **plugins** and **practices** to reduce the amount of boilerplate and wiring code required to use Vuex.

Vuex Pathify is three things:

- basic **practices** to simplify your setup and interaction with the Vuex store
- essential **helpers** for store and components to reduce the amount of boilerplate and wiring
- specific **plugins** to accomplish some common store management tasks

## Rationale

Vuex, by its very nature adds complexity to a project.

But what if that complexity could be simplified?

Superstore is the result of working with Vuex on several big projects, and realising that a lot of the setup and wiring can be abstracted.

- rather than worrying about 4 ways to get and set data, you just manage 2
- rather than using 3 path targets or formats to access the store, you just use 1
- rather than using 3 different naming formats, you just use 1

 
The rationale is that state management shouldn't cause you to write more code than you need to. 

storing values shouldn't be complex.



- simplify the somewhat complex interface to Vuex
- abstract the complex wiring, especially in components
- provide a common property access
- write less, more obvious, code

Superstore works best when you make a 

More information can be found here.



## Details





Setup:

- a streamlined way of naming and working with the store
    - use the same name for state, mutations and getters 

Store helpers:

- automatic mutation and getter creation
    - automatically create mutations for store properties
    - automatically create getters for store properties
- deep-set and get for store objects
    - reach into object properties in one liners

Component helpers:

- 1 and 2-way sync helpers for components
    - get, and sync values to and from the store
    
Plugins:

- local storage sync
    - transparent save() and restore()
- initial state and store reset
    - store.initial()
    - store.reset()
- additional store methods
    - store.set()
    - store.get()

Old

- simple 1-way & 2-way component syncing
- creation helpers to keep your modules lean and mean
- helpful utility methods attached directly to the store instance
- plugins to assist you at all stages of the store lifecycle

Combined, they drastically reduce the physical and cognitive effort of working with Vuex.

You'll write less code, with increased clarity.

What's not to love?

## Motivation

Superstore is a bunch of tips, tricks, and behind-the-scenes code that that make your day-to-day work with Vuex easier. 

It was born out of a year with working with Vuex on a large, complex fintech / e-commerce site, and wondering how working with Vuex could be simpler.

We looked at what worked vs what was overkill, and the bottom line is

For general store interaction...

- name state, getters and mutations identically
- prefer state access to getter access
- create getters only when required
- commit mutations for synchronous updates
- dispatch actions for async operations

For setup and wiring...

- helpers cut down on boilerplate
- abstractions reduce repetition
- best practices reduce LOC

For sanity...

- 


## Setup

Store setup using Superstore typically lighter than Vuex alone, as long as you agree to a few simple practices:

#### 1. Name single state, getter and mutation properties identically

So for a single property `item` in the store:

- rather than: `item`, `getItem`, and `SET_ITEM` 
- use just: `item`

This make it easy for superstore to treat everything the same, and additionally you only need to remember a single identifier per property.

#### Create getters only where you want the output to be transformed

A common "best practice" is to create getters for every accessible state property, but this leads to bloated stores, and worse, implies that state should not be accessed directly when of course it should.

Superstore helpers will determine if a property should be retrieved from state / getters, and provides its own consistency through its API, so you can ditch the redundant getter and actions:

Default to state, override with getters

```
const value = get('products/latest') // determines state or getter
```


#### You're happy to commit mutations directly

Additionally, the Getters Brigade also require that you commit all changes through actions, when there's no technical reason for this aside from consistency.


As mentioned above
    - you don't need an action for every mutation

Additionally, Superstore provides helpers to take care of the boring wiring you'd generally do yourself


For example, a typical store might look like this

```javascript
import { makeMutations } from 'vuex-pathify'
import Item from 'classes/Item'
import Api from 'services/Api'

const state = {
  id: null,
  name: null,
  items: []
}

// create actions as needed
const actions = {
  loadItems ({commit}) {
    Api.load('items').then(res => commit('items', res.data))
  }
}

// create mutations automatically
const mutations = makeMutations(state)

// create only single getter, named the same to return objects as classes
const getters = {
  items: state => state.items.map(item => new Item(item))
}

export default {
  state,
  actions,
  mutations,
  getters
}
```



### Name state, getters and mutations identically

Set, get or transform `id` rather than 

Treating a property as a single entity, i.e. `id` is significantly easier than managing 3 separate properties:


|   | state | getter | mutation | action |
| --- | --- | --- | --- | --- |
| Vuex | id | getId | SET_ID  | setId |
| Superstore | id | id | id | setId |

Naming actions descriptively is always advised.

Naming state, getters and mutations the same allows Superstore to treat getting and settings values the same:

```
store.set('todo', 1)
todos = store.get('todos')
todo = store.get('getTodo', 5)
todo = store.getters.getTodo(5)

```


```
// redundant
store.state.id
store.getters.getId
commit('SET_ID', 1)

// better
store.state.id
store.getters.id
commit('id', 1)
```

### Prefer reading from state rather than getters

One of the reasons to use getters is to provide consistency, therefore you'll see a lot of stores with as many (redundant) getters as there are state properties:

```
const getters = {
    id => state => state.id,
    name => state => state.name,
    email => state => state.email,
}
```
```
// redundant
var id = store.getters.id

// simple
var id = store.state.id
```

### Create getters only to override state

### Commit changes directly, from anywhere

Dispatching an action provides no more safety than committing a mutation, yet people will tell you "it should be done this way"

If a store update doesn't need a server, just commit it:

```
// redundant
commit('id', 1)
``` 

### Call actions only for async operations

We wrote the helpers accordingly, and the results are astounding.



The plugin:

- provides a facade to
    - read the right value
    - set the same value

I studied everything I could about Vuex; naming conventions, best practices, and determined that the things that should be simple weren't, and the things that could be easier weren't.

Over the course of the project, 



## Introduction

State management with Vuex brings with it various advantages, but with [significant overhead](discussion.md) compared to simple stores for full read/write access:
 
 - additional boilerplate beyond an initial state setup
 - additional machinery and wiring for even read-write access
 - differences between core API interfaces
 - cognitive overhead and planning for

As such, the package has several aims:

- provide a common interface to get and set data
- provide a common pattern to access store members
- reduce overall boilerplate and wiring

These aims are discussed in more detail [here](aims.md).

## Getting started

Check the docs to get started:

- [Setup](store.md) - helpers to minimise store boilerplate
- [Accessors](../api/index.md) - unified, one-liner read/write store access
- [Components](../api/component.md) - unified, one-liner read/write component wiring

