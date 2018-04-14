import RepoCollection from './ui/RepoCollection'

/**
 * Base component for all comparisons
 */
export default function (repo) {
  return {
    components: {
      RepoCollection
    },

    watch: {
      language () {
        this.load()
      },

      type () {
        this.load()
      }
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