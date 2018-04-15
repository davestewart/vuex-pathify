<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Pathify (implicit)</h2>
      <blockquote>
        <p>Demo uses core Pathify get and sync functions, sub-property access, and implicit wildcard syntax.</p>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <legend>Personal</legend>
        <ui-input label="First Name" v-model="firstName" />
        <ui-input label="Last Name" v-model="lastName" />
        <ui-input label="Email" v-model="email" />
        <ui-input label="Website" v-model="website" />
        <ui-input label="Phone" v-model="phone" />
      </fieldset>

      <fieldset class="column">
        <legend>Address</legend>
        <ui-input label="Line1" v-model="line1" />
        <ui-input label="Line2" v-model="line2" />
        <ui-input label="Town" v-model="town" />
        <ui-input label="Zipcode" v-model="zipcode" />
      </fieldset>
    </div>

    <div class="card">
      <div class="card-content content">
        <p class="title is-4">{{ name }}</p>
        <p class="subtitle is-6"><a :href="'mailto:' + email">{{ email }}</a> | <a :href="website">{{ website }}</a> | {{ phone }}</p>
        <p>{{ line1 }}<br>{{ line2 }}<br>{{ town }}<br>{{ zipcode }}</p>
      </div>
    </div>

  </article>

</template>

<script>
  import { get, sync } from 'vuex-pathify'

  export default {
    computed: {
      name: get('user1/name'),
      ...sync('user1/personal@*'),
      ...sync('user1/address@*'),
    }
  }
</script>
