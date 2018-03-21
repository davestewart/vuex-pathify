# Configuration

> Configure Pathify using custom options

## Overview

Pathify loads with the following defaults:


```js
export default {
  resolver: 'standard', // resolve store members using the standard naming scheme
  strict: true,         // throw error if store member cannot be found
  cache: true,          // cache generated functions for faster re-use
  deep: true,           // allow sub-property access to Vuex stores
}
```

If you need to change this, you probably want to do one of two things:

- configure naming with the [resolver](/guide/resolvers.md) option
- configure additional [options](/guide/options.md)

Read the documentation as required, then **follow the steps below**.
 
## Config

<p class="tip">
    <strong style="color:red">Important!</strong><br>
    Because of the way ES6 imports work, configuration <strong>must</strong> be saved in a standalone file and <strong>must</strong> be imported before any store files.
</p>

Create a new file called `pathify.js` and save it in the same folder as your store index file (or anywhere, really).

Add the following code to import, configure and re-export the Pathify, modifying the [options](/guide/options.md) as desired:

```js
import pathify from 'vuex-pathify'
export default pathify

// options
pathify.options.resolver = 'simple'
pathify.options.deep = false
```

In your store's index file **make sure to import the local config file** rather than the package:

```js
// packages
import Vue from 'vue'
import Vuex from 'vuex'

// pathify config
import pathify from './pathify' // <-- note the ./ denoting a local file!

// store
const store = {
  ...
  plugins: [ pathify.plugin ],
  ...
}
```

Then finish setting up your project as you would otherwise.

<p class="tip"><strong>Remember:</strong><br>Failing to import Pathify configuration before store imports will result in the <strong>default</strong> settings being used.</p>

## Troubleshooting

If you need to check your settings, you can call `pathify.debug()` at any time which will output the current `options` values and a breakdown of the resolver function output.

```text
  [Vuex Pathify] - Options

  Resolver (custom)
-------------------------------
  state      : value
  getters    : getValue
  actions    : setValue
  mutations  : SET_VALUE

  Settings
-------------------------------
  strict     : true
  cache      : true
  deep       : true
```

Note that calling `debug()` **will not** not show you the configuration used by your store files if you failed to import any custom config before the store files were accessed!