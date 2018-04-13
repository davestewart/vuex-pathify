<template>

  <aside class="sidebar">

    <p class="menu-label">Demo</p>
    <ul class="menu-list">
      <li><router-link to="/home">Home</router-link></li>
    </ul>

    <p class="menu-label">Features</p>
    <ul class="menu-list">
      <li><router-link to="/features/basics">Basics</router-link></li>
      <li><router-link to="/features/helpers/store">Store helpers</router-link></li>
    </ul>

    <p class="menu-label">Code comparisons</p>
    <ul class="menu-list">
      <li><router-link to="/code">Overview</router-link></li>
      <li>
        <router-link to="/code/repos" class="is-parent">Typical component</router-link>
        <ul class="menu-list">
          <li><router-link to="/code/repos/pathify">Pathify</router-link></li>
          <li><router-link to="/code/repos/vue-computed">Vuex computed</router-link></li>
          <li><router-link to="/code/repos/vuex-helpers">Vuex helpers</router-link></li>
        </ul>
      </li>

      <li>
        <router-link to="/code/user" class="is-parent">Large component</router-link>
        <ul class="menu-list">
          <li><router-link to="/code/user/pathify-implicit">Pathify (implicit)</router-link></li>
          <li><router-link to="/code/user/pathify-explicit">Pathify (explicit)</router-link></li>
          <li><router-link to="/code/user/vue-computed-light">Vue computed (light)</router-link></li>
          <li><router-link to="/code/user/vue-computed-full">Vue computed (full)</router-link></li>
          <li><router-link to="/code/user/vuex-helpers-light">Vuex helpers (light)</router-link></li>
          <li><router-link to="/code/user/vuex-helpers-full">Vuex helpers (full)</router-link></li>
        </ul>
      </li>
    </ul>

  </aside>

</template>

<script>
  export default {

    methods: {
      is (path) {
        console.log(path)
        return this.$route.path.startsWith(path)
      }
    }

  }
</script>

<style lang="scss" scoped>

  aside {
    margin-top: 55px;
  }

  .menu-list a {
    padding: .4em .8em;
  }

  .is-link-active {
    // background: hsl(0, 0%, 96%);

    &.is-link-exact {
      background: hsl(171, 100%, 41%);
    }
  }

  ul > li > ul > li a {
    font-size: 0.85em;
  }
</style>