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
        return this.$store.state.user6
      },

      name () {
        return this.$store.getters['user6/name']
      },

      firstName: {
        get () {
          return this.$store.getters['user6/firstName']
        },
        set (value) {
          this.$store.dispatch('user6/setFirstName', value)
        }
      },

      lastName: {
        get () {
          return this.$store.getters['user6/lastName']
        },
        set (value) {
          this.$store.dispatch('user6/setLastName', value)
        }
      },

      email: {
        get () {
          return this.$store.getters['user6/email']
        },
        set (value) {
          this.$store.dispatch('user6/setEmail', value)
        }
      },

      telephone: {
        get () {
          return this.$store.getters['user6/telephone']
        },
        set (value) {
          this.$store.dispatch('user6/setTelephone', value)
        }
      },

      mobile: {
        get () {
          return this.$store.getters['user6/mobile']
        },
        set (value) {
          this.$store.dispatch('user6/setMobile', value)
        }
      },

      address: {
        get () {
          return this.$store.getters['user6/address']
        },
        set (value) {
          this.$store.dispatch('user6/setAddress', value)
        }
      },

      line1: {
        get () {
          return this.$store.getters['user6/line1']
        },
        set (value) {
          this.$store.dispatch('user6/setLine1', value)
        }
      },

      line2: {
        get () {
          return this.$store.getters['user6/line2']
        },
        set (value) {
          this.$store.dispatch('user6/setLine2', value)
        }
      },

      town: {
        get () {
          return this.$store.getters['user6/town']
        },
        set (value) {
          this.$store.dispatch('user6/setTown', value)
        }
      },

      postcode: {
        get () {
          return this.$store.getters['user6/postcode']
        },
        set (value) {
          this.$store.dispatch('user6/setPostcode', value)
        }
      },

    }
  }
</script>
