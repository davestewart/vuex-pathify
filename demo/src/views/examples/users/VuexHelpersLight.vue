<template>
  <div>
    <h2>{{ name }}</h2>
    <section>
      <h3>Personal</h3>
      <label>First Name: <input :value="firstName" @input.stop="SET_FIRST_NAME($event.target.value)"></label>
      <label>Last Name: <input :value="lastName" @input.stop="SET_LAST_NAME($event.target.value)"></label>
      <label>Email: <input :value="email" @input.stop="SET_EMAIL($event.target.value)"></label>
      <label>Telephone: <input :value="telephone" @input.stop="SET_TELEPHONE($event.target.value)"></label>
      <label>Mobile: <input :value="mobile" @input.stop="SET_MOBILE($event.target.value)"></label>

      <h3>Address</h3>
      <label>Line 1: <input :value="address.line1" @input.stop="SET_LINE1($event.target.value)"></label>
      <label>Line 2: <input :value="address.line2" @input.stop="SET_LINE2($event.target.value)"></label>
      <label>Town: <input :value="address.town" @input.stop="SET_TOWN($event.target.value)"></label>
      <label>Postcode: <input :value="address.postcode" @input.stop="SET_POSTCODE($event.target.value)"></label>
    </section>
    <pre>{{ user }}</pre>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {

    computed: {
      user () {
        return this.$store.state.user3
      },

      ...mapGetters('user3', [
        'name',
      ]),

      ...mapState('user3', [
        'firstName',
        'lastName',
        'email',
        'telephone',
        'mobile',
        'address',
      ])
    },

    methods: {
      ...mapMutations('user3', [
        'SET_FIRST_NAME',
        'SET_LAST_NAME',
        'SET_EMAIL',
        'SET_TELEPHONE',
        'SET_MOBILE',
        'SET_LINE1',
        'SET_LINE2',
        'SET_TOWN',
        'SET_POSTCODE',
      ]),

      setAddress(key, value) {
        this.$store.commit('SET_ADDRESS', {key, value})
      }
    },
  }
</script>
