<template>

  <aside class="sidebar">

    <h1>Vuex Pathify Demo</h1>

    <p class="menu-label">Demo</p>
    <ul class="menu-list">
      <li><router-link to="/home">Home</router-link></li>
    </ul>

    <p class="menu-label">API</p>
    <ul class="menu-list">
      <li><router-link class="code" to="/api/paths">Path syntax</router-link></li>
      <li><router-link class="code" to="/api/store">Store helpers</router-link></li>
      <li><router-link class="code" to="/api/accessors">Store accessors</router-link></li>
      <li><router-link class="code" to="/api/component">Component helpers</router-link></li>
      <li><router-link class="code" to="/api/properties">Advanced property access</router-link></li>
    </ul>

    <p class="menu-label">Code comparisons</p>
    <ul class="menu-list">
      <li><router-link to="/code">Overview</router-link></li>
      <li>
        <router-link to="/code/typical" class="is-parent">Typical component</router-link>
        <ul class="menu-list">
          <li><router-link class="code" to="/code/typical/pathify">Pathify</router-link></li>
          <li><router-link class="code" to="/code/typical/vuex-helpers">Vuex helpers (light)</router-link></li>
          <li><router-link class="code" to="/code/typical/vue-computed">Vue computed (light)</router-link></li>
        </ul>
      </li>

      <li>
        <router-link to="/code/large" class="is-parent">Large component</router-link>
        <ul class="menu-list">
          <li><router-link class="code" to="/code/large/pathify-implicit">Pathify (implicit)</router-link></li>
          <li><router-link class="code" to="/code/large/pathify-explicit">Pathify (explicit)</router-link></li>
          <li><router-link class="code" to="/code/large/vuex-helpers-light">Vuex helpers (light)</router-link></li>
          <li><router-link class="code" to="/code/large/vuex-helpers-full">Vuex helpers (full)</router-link></li>
          <li><router-link class="code" to="/code/large/vue-computed-light">Vue computed (light)</router-link></li>
          <li><router-link class="code" to="/code/large/vue-computed-full">Vue computed (full)</router-link></li>
        </ul>
      </li>
    </ul>

  </aside>

</template>

<style lang="scss" scoped>

  aside {
    border-right: 1px solid rgba(0,0,0,.07);
    min-height: 100vh;
  }

  h1 {
    margin: 25px 0 25px 0;
    font-size: 24px
  }

  .menu-list a {
    padding: .4em .8em;
    letter-spacing: 0.02em;
  }

  .is-link-active {
    // background: hsl(0, 0%, 96%);

    &.is-link-exact {
      // color: hsl(171, 100%, 41%);
      color: rgb(37, 175, 175);
      font-weight: bold;
    }
  }

  a {
    font-size: 0.85em;
  }

  ul > li > ul > li a {
    // font-size: 0.85em;
  }

  .code:before {
    font-family: FontAwesome;
    margin-right: .5em;
    content: "\f108";
  }
</style>