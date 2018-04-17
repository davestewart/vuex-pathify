<template>
  <button class="button is-small is-primary" @click="open" title="View docs" :title="url">
    <i class="fa fa-file-text-o"></i> View docs
  </button>
</template>

<script>
  export default {
    props: {
      src: String,
    },

    computed: {
      url () {
        return `https://davestewart.github.io/vuex-pathify/#/${this.src}`
      }
    },

    methods: {
      open () {
        window.open(this.url, 'docs');
      }
    }
  }
</script>
