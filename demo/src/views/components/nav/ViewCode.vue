<template>
  <button v-if="isActive" class="button is-small is-primary" @click="open" :title="url">
    <i class="fa fa-code"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
  import { actions, dispatch } from 'codesandbox-api';

  export default {
    props: {
      src: String,
    },

    computed: {
      isActive () {
        return this.src// && window.location.href.includes('codesandbox')
      },

      url () {
        return `/src/${this.src}`
      },

      text () {
        return this.src.includes('/view')
          ? 'View component'
          : this.src.includes('/store')
            ? 'View store'
            : 'View code'
      }
    },

    methods: {
      open() {
        dispatch(actions.editor.openModule(this.url));
      },
    }
  }
</script>
