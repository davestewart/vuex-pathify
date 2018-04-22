# Vuex Pathify demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Local development

To develop Pathify locally and run a live demo, having downloaded the entire Vuex Pathify repo, you should `npm link` the core repo so you can work with the local version of the package as if were installed globally.

From the root of the downloaded repo:

```bash
# register Pathify globally
npm link

# change to the demo's node modules
cd demo/node_modules

# link to the global reference
npm link vuex-pathify
```

Next, to statr development, run package's `dev` script which will build and watch the plugin, and run the browser demo:

```bash
cd ../../
npm run dev
```
