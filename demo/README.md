# Vuex Pathify demo

## Demo only

To run the demo, install and run as follows:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Local development

To develop Pathify locally whilst running the demo, you should `npm link` the core repo so you can work with the local version of the package as if were installed globally.

From the root of the downloaded repo:

```bash
# register Pathify globally
npm link

# change to the demo's node modules
cd demo/node_modules

# link to the global reference
npm link vuex-pathify
```

Next, to begin development, run package's `dev` script which will build and watch the plugin, and launch the browser demo in parallel:

```bash
cd ../../
npm run dev
```
