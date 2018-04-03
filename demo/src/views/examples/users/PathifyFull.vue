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
  import { get, sync } from 'vuex-pathify'

  export default {
    computed: {
      user: get('user2'),
      name: get('user2/name'),
      ...sync('user2/', [
        'firstName',
        'lastName',
        'email',
        'telephone',
        'mobile'
      ]),
      ...sync('user2/address@', [
        'line1',
        'line2',
        'town',
        'postcode'
      ]),
    }
  }
</script>
