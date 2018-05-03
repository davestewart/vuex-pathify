<template>

  <article>

    <div class="content">
      <h2 class="title is-2">Hello {{ name }} !</h2>
      <blockquote>
        <p>The simplest example with the least code to get you started</p>
        <edit-code src="examples/simple/Hello.vue"/>
        <edit-code src="examples/simple/hello.js" label="Edit store"/>
      </blockquote>
    </div>

    <div class="content">
      <input class="input" type="text" v-model="name">
    </div>

  </article>

</template>

<script>
  import { sync } from 'vuex-pathify'

  export default {
    computed: {
      // syncing just the single value in the store
      name: sync('hello/name')
    }
  }

</script>
