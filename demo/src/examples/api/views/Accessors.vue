<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Store accessors</h2>
      <blockquote>
        <p>Store accessors provide global read / write access to the store</p>
        <view-code src="examples/api/views/Accessors.vue"/>
        <view-code src="examples/api/stores/api.js"/>
        <view-docs src="api/accessors"/>
      </blockquote>
    </div>

    <div class="content">
      <p>This is the example module store:</p>
      <pre>{{ data }}</pre>

      <p>Click to <a href="#" @click.prevent="setData">set value...</a></p>
      <pre>{{ data.value }}</pre>

      <p>Click to <a href="#" @click.prevent="getData">get value:</a></p>
      <pre>{{ value }}</pre>

      <p>Click to get a copy of
        <a href="#" @click.prevent="copyData('module')">the store</a> /
        <a href="#" @click.prevent="copyData('module/object')">a property</a> /
        <a href="#" @click.prevent="copyData('module/object@a')">a sub-property</a>
      </p>
      <pre>{{ copy }}</pre>
    </div>

  </article>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    data () {
      return {
        value: '...',
        copy: '...',
      }
    },

    computed: {
      data: get('module'),
    },

    methods: {
      setData () {
        this.$store.set('module/value', Date.now())
      },

      getData () {
        this.value = this.$store.get('module/value')
      },

      copyData (path) {
        this.copy = this.$store.copy(path)
      },

    }
  }
</script>
