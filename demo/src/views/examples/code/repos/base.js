export default function (repo) {
  return {

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