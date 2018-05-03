import RepoCollection from './RepoCollection'

/**
 * Base component for all comparisons
 */
export default function (repo) {
  return {
    components: {
      RepoCollection
    },

    watch: {
      language: 'load',
      type: 'load',
    },

    created () {
      this.load()
    },

    methods: {
      load () {
        this.$store.dispatch(repo + '/load')
      }
    }

  }
}