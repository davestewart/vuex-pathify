<template>
  <button v-if="isActive" class="button is-small is-primary" @click="open" :title="url">
    <i class="fa fa-code"></i> {{ label || text }}
  </button>
</template>

<script>
  import { actions, dispatch } from 'codesandbox-api';

  export default {
    props: {
      src: String,
      label: String
    },

    computed: {
      isActive () {
        return this.src
      },

      isCodeSandbox () {
        return window.location.href.includes('codesandbox')
      },

      url () {
        return `/src/${this.src}`
      },

      text () {
        return this.src.includes('.vue')
          ? 'Edit component'
          : this.src.includes('/vuex')
            ? 'Edit store'
            : 'Edit code'
      }
    },

    methods: {
      open() {
        dispatch(actions.editor.openModule(this.url));
      },
    }
  }
</script>
