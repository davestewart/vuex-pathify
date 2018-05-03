<template>

  <div class="content">
    <div style="text-align: center">
      <img src="../../assets/img/pathify-logo.png" width="450">
    </div>

    <h4 class="title is-4">Introduction</h4>
    <p>This demo is intended to illustrate both API and real-world usage.</p>

    <p>For a simple, self-contained, "getting started" style demo, check out:</p>
    <ul>
      <li><a href="https://codesandbox.io/s/xpl8x520vo" target="_blank">Hello World</a></li>
    </ul>

    <p>Otherwise, the API section demonstrates core Pathify features:</p>
    <ul>
      <li><router-link class="code" to="/api/paths">Path syntax</router-link></li>
      <li><router-link class="code" to="/api/accessors">Store accessors</router-link></li>
      <li><router-link class="code" to="/api/component">Component helpers</router-link></li>
      <li><router-link class="code" to="/api/properties">Advanced property access</router-link></li>
    </ul>

    <p>The Code Comparisons section demonstrates real-world components using differing Vuex setups, with analysis and statistics:</p>
    <ul>
      <li><router-link to="/code" class="is-parent">Overview</router-link></li>
      <li><router-link to="/code/typical" class="is-parent">Typical component</router-link></li>
      <li><router-link to="/code/large" class="is-parent">Large component</router-link></li>
    </ul>

    <h4 class="title is-4">Running the examples</h4>

    <p>Use the menu on the left to navigate the examples.</p>

    <p>The examples are designed to be viewed in parallel with editing the code. For each:</p>
    <ul>
      <li>there are buttons to open the associated files</li>
      <li>source code is clearly commented, with editing suggestions where appropriate</li>
      <li>additional buttons link to any related documentation</li>
    </ul>

    <p>Each example will have one component and one store file. The files will be self-contained, with a few exceptions:</p>
    <ul>
      <li>Some files extend from a <code>base.js</code> file, where there is common functionality</li>
      <li>Some components reference the same store, where there is common data</li>
    </ul>

    <h4 class="title is-4">Folder structure</h4>

    <p>The application code (for the overall demo) can be found in the <code>src/app/</code> folder:</p>

    <pre style="font-size: 12px">
+- src
    +- app
        +- assets
        +- router
        +- store                      <-- pathify setup
        +- views
    </pre>

    <p>Check the <code>store/</code> folder to view Pathify and store setup. There are a lot of imports, but there are a lot of features to demonstrate (one per module)!</p>

    <p>The example code (for each feature or example) can be found in the <code>src/examples/</code> folder:</p>
    <pre style="font-size: 12px">
+- src
    +- examples
        +- api
        +- large
        +- typical
    </pre>

    <p>Each example group is self-contained with its own vuex stores, views and supporting files:</p>
    <pre style="font-size: 12px">
+- src
    +- examples
        +- ...
        +- typical                    <-- example group
            |
            +- ui / icons / etc       <-- supporting files
            |
            +- vuex                   <-- vuex store files
            |   +- base.js
            |   +- index.js
            |   +- pathify.js
            |   +- vuex-light.js
            |
            +- Pathify.vue            <-- component files
            +- VueComputed.vue
            +- VuexHelpers.vue
    </pre>

    <p>You can manually navigate to the folders, or as mentioned above, use the edit buttons to jump directly to the file.</p>


    <h4 class="title is-4">Using Vue Devtools</h4>

    <p>You will probably want to use Vue Devtools as you run the demo to see the store update.</p>
    <p>As CodeSandbox runs in an iframe, you'll need to open the preview pane in a new window. Click the arrow-like icon above the preview pane to do this, then use Vue Devtools as normal.</p>
    <p>Note that you will still be able to edit the code and see the results! CodeSandbox is that cool :)</p>

  </div>

</template>
