<template>
  <div>
    <h2>{{ name }}</h2>
    <section>
      <h3>Personal</h3>
      <label>First Name: <input v-model="firstName"></label>
      <label>Last Name: <input v-model="lastName"></label>
      <label>Email: <input v-model="email"></label>
      <label>Telephone: <input v-model="telephone"></label>
      <label>Mobile: <input v-model="mobile"></label>

      <h3>Address</h3>
      <label>Line 1: <input v-model="line1"></label>
      <label>Line 2: <input v-model="line2"></label>
      <label>Town: <input v-model="town"></label>
      <label>Postcode: <input v-model="postcode"></label>
    </section>
    <pre>{{ user }}</pre>
  </div>
</template>

<script>
  export default {
    computed: {

      user () {
        return this.$store.state.user5
      },

      name () {
        return this.$store.getters['user5/name']
      },

      firstName: {
        get () {
          return this.$store.state.user5.firstName
        },
        set (value) {
          this.$store.commit('user5/SET_FIRST_NAME', value)
        }
      },

      lastName: {
        get () {
          return this.$store.state.user5.lastName
        },
        set (value) {
          this.$store.commit('user5/SET_LAST_NAME', value)
        }
      },

      email: {
        get () {
          return this.$store.state.user5.email
        },
        set (value) {
          this.$store.commit('user5/SET_EMAIL', value)
        }
      },

      telephone: {
        get () {
          return this.$store.state.user5.telephone
        },
        set (value) {
          this.$store.commit('user5/SET_TELEPHONE', value)
        }
      },

      mobile: {
        get () {
          return this.$store.state.user5.mobile
        },
        set (value) {
          this.$store.commit('user5/SET_MOBILE', value)
        }
      },

      address: {
        get () {
          return this.$store.state.user5.address
        },
        set (value) {
          this.$store.commit('user5/SET_ADDRESS', value)
        }
      },

      line1: {
        get () {
          return this.$store.state.user5.line1
        },
        set (value) {
          this.$store.commit('user5/SET_LINE1', value)
        }
      },

      line2: {
        get () {
          return this.$store.state.user5.line2
        },
        set (value) {
          this.$store.commit('user5/SET_LINE2', value)
        }
      },

      town: {
        get () {
          return this.$store.state.user5.town
        },
        set (value) {
          this.$store.commit('user5/SET_TOWN', value)
        }
      },

      postcode: {
        get () {
          return this.$store.state.user5.postcode
        },
        set (value) {
          this.$store.commit('user5/SET_POSTCODE', value)
        }
      },

    }
  }
</script>
