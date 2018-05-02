<template>

  <div class="content">
    <div style="text-align: center">
      <img src="../../../assets/img/pathify-logo.png" width="450">
    </div>

    <h4 class="title is-4">Introduction</h4>
    <p>This demo is intended to illustrate both API and real-world usage.</p>

    <p>The API section demonstrates core Pathify features:</p>
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
      <li>source code is clearly commented, with interactive suggestions where appropriate</li>
      <li>additional buttons link to any related documentation</li>
    </ul>


    <h4 class="title is-4">Folder structure</h4>

    <p>The application code (for the overall demo) can be found in the <code>src/app/</code> folder:</p>

    <pre style="font-size: 12px">
+- src
    +- app
        +- router
        +- store
        +- views
    </pre>

    <p>The example code (for each feature or example) can be found in the <code>src/examples/</code> folder:</p>
    <pre style="font-size: 12px">
+- src
    +- examples
        +- api
        +- large
        +- typical
    </pre>

    <p>Each set of examples is <strong>self-contained</strong> with its own stores, views and supporting files sitting in subfolders:</p>
    <pre style="font-size: 12px">
+- src
    +- examples                       <-- root examples folder
        |
        +- api
        |
        +- large
        |
        +- typical                    <-- "typical component" example set + related files
            |
            +- stores
            |   +- pathify.js
            |   +- vuex-light.js
            |   ...
            |
            +- views
                +- Pathify.vue
                +- VueComputed.vue
                +- ui
                |  ...
                ...
    </pre>

    <p>You can manually navigate to the folders, or as mentioned above, use the edit buttons to jump directly to the file.</p>

  </div>

</template>
