# Installation & setup

> Setup the plugin in a new project

## Installation

In your project's root folder, install using NPM or yarn:

```text
npm i -S vuex-pathify
```
```text
yarn add vuex-pathify
```

## Config

Because Pathify [maps](/guide/resolvers) paths to store members, it's critical that store members are named **predictably**.

The naming scheme below seems to be the most **common** amongst Vue developers, so is the default:


```js
state:         foo         // base name
getters:       foo         // no prefix, no case conversion
mutations:     SET_FOO     // "set" prefix, constant case, 
actions:       setFoo      // "set" prefix, camel case, 
``` 

If you use a **different** scheme (prefixes, casing) then you'll need to [configure](/guide/config.md) Pathify before using it.

<p class="tip">
    <strong>Warning!</strong><br>
    You will not be able to use Pathify if the configured naming scheme is different to your store naming scheme.
</p>

## Setup

In your store's entry point, setup your store, and activate the plugin:

```js
// packages
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'pathify'

// store definition
const store = {
  // state, members, modules, etc
}

// store
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [ pathify.plugin ], // activate plugin
  ...store
})
```

When you're happy with your setup, continue:

> Next step: [Usage instructions](/guide/usage.md)   


