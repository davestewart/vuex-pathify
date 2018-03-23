# Setup

> Install and setup the plugin in a new project

## Installation

In your project's root folder, install using NPM or yarn:

```shell
npm install vuex-pathify --save
```
```shell
yarn add vuex-pathify
```

## Config

If you haven't had a brief skim over the [plugin overview](/discussion/overview.md) page, you should do so now, as it explains the process Pathify uses to map paths to store members using **naming schemes** and **mapping**.

Pathify's default mapping, hereon known as **"standard"**, seems to be the most common amongst Vue developers:


```js
state:         foo         // base name
getters:       foo         // no prefix, no case conversion
mutations:     SET_FOO     // "set" prefix, constant case, 
actions:       setFoo      // "set" prefix, camel case, 
``` 
Before continuing, ensure your store naming reflects this, or [configure](/guide/config.md) an alternative mapping preset or custom mapping functi0on instead.

!>**Warning!**<br>You will not be able to update the store if Pathify cannot map paths to Vuex members.

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

> Next step: [Usage instructions](/resources/usage.md)   


