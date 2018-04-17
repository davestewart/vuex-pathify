<template>
  <div class="links" v-if="showFile || showDocs">
    <button v-if="showFile" class="button is-small is-primary" @click="viewFile" title="View code">
      <i class="fa fa-code"></i> View code
    </button>
    <button v-if="showDocs" class="button is-small is-primary" @click="viewDocs" title="View docs">
      <i class="fa fa-file-text-o"></i> View docs
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      file: String,
      docs: String,
    },

    computed: {
      showFile () {
        return this.file && /codesandbox|localhost/.test(location.href)
      },

      showDocs () {
        return this.docs
      }
    },

    methods: {
      viewFile () {
        dispatch(actions.editor.openModule(`/src/${this.file.replace(/\.js$/, '')}.js`));
      },

      viewDocs () {
        window.open(`https://davestewart.github.io/vuex-pathify/#/${this.docs}`, 'docs');
      }
    }
  }
</script>

<style lang="scss" scoped>

  .links {
    /*
    position: fixed;
    top: 0;
    right: 0;
    padding: 10px;
    */
  }

  button.is-primary {
    i {
      margin-right: .5em;
    }

    background: #25afaf;

    &:hover {
      background: #25afaf;
      opacity: 0.8;
    }
  }


</style>