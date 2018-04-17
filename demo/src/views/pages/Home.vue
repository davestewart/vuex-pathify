<template>

  <div class="content">
    <h1 class="title is-2">Vuex Pathify Demo</h1>
    <h3>Introduction</h3>
    <p>The demo is designed to be run on CodeSandbox, or locally via NPM.</p>
    <p>In both environments, you can edit the code and see results live in the browser. The source code is clearly commented, with interactive suggestions where appropriate.</p>
    <p>In demo components, there are buttons to view the related docs, and when running in CodeSandbox, buttons to jump straight to the code.</p>

    <h3>Sections</h3>

    <p>The API section demonstrates core Pathify features:</p>
    <ul>
      <li><router-link class="code" to="/api/paths">Path syntax</router-link></li>
      <li><router-link class="code" to="/api/accessors">Store accessors</router-link></li>
      <li><router-link class="code" to="/api/component">Component helpers</router-link></li>
      <li><router-link class="code" to="/api/properties">Advanced property access</router-link></li>
    </ul>

    <p>The Code Comparisons section demonstrates real-world components using differing Vuex setups, with analysis and statistics:</p>
    <ul>
      <li><router-link to="/code/typical" class="is-parent">Typical component</router-link></li>
      <li><router-link to="/code/large" class="is-parent">Large component</router-link></li>
    </ul>
  </div>

</template>
