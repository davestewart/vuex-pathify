# Installation

> Install and setup the plugin in a new project

## Download

In your project's root folder, download and install the package using npm or yarn:

```shell
npm i vuex-pathify
```
```shell
yarn add vuex-pathify
```

## Config

If you haven't yet read the [Intro](/intro/pathify.md) section, Pathify **gets and sets** values by mapping **paths** to **store members**.

To do this, Pathify needs to know your store **naming scheme** so it can generate code that suits your setup:

scheme|path|state|getter|mutation|action|notes
:---|:---|:---|:---|:---|:---|:---
**standard**|`/foo`|foo|foo|SET_FOO|setFoo|Used by most Vue developers
**simple**|`/foo`|foo|foo|foo|setFoo|Simpler, unified format
**custom**|`/foo`|?|?|?|?|User must supply custom mapping function

If you use the default **standard** naming scheme above, then no configuration is required.
 
If not, you'll need to [configure](/setup/config.md) Pathify before continuing.

## Setup

In your store's entry point, setup your store, and activate the plugin:

```js
// packages
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

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

To get going immediately after installing, check out:

- [API reference](/api/index.md)
- [Demos](/intro/demos.md)   


