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
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

    computed: {
      user () {
        return this.$store.state.user4
      },

      ...mapGetters('user4', [
        'name',
        'firstName',
        'lastName',
        'email',
        'telephone',
        'mobile',
        'address',
        'line1',
        'line2',
        'town',
        'postcode',
      ])
    },

    methods: {
      ...mapActions('user4', [
        'setFirstName',
        'setLastName',
        'setEmail',
        'setTelephone',
        'setMobile',
        'setAddress',
        'setLine1',
        'setLine2',
        'setTown',
        'setPostcode',
      ])
    },
  }

</script>
