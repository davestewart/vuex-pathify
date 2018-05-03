<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Pathify (explicit)</h2>
      <blockquote>
        <p>Demo uses Pathify sync and explicit array syntax</p>
        <edit-code src="examples/large/PathifyExplicit.vue"/>
        <edit-code src="examples/large/vuex/pathify.js"/>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <ui-input label="First Name" v-model="firstName"/>
        <ui-input label="Last Name" v-model="lastName"/>
        <ui-input label="Email" v-model="email"/>
        <ui-input label="Website" v-model="website"/>
        <ui-input label="Phone" v-model="phone"/>
      </fieldset>

      <fieldset class="column">
        <ui-input label="Street" v-model="street"/>
        <ui-input label="Area" v-model="area"/>
        <ui-input label="Town" v-model="town"/>
        <ui-input label="Zipcode" v-model="zipcode"/>
        <ui-input label="Country" v-model="country"/>
      </fieldset>
    </div>

    <user-card user="user2"/>

  </article>

</template>

<script>
  import { sync } from 'vuex-pathify'

  import base from './ui/base.js'

  export default {

    extends: base,

    computed: {
      ...sync('user2/', [
        'firstName',
        'lastName',
        'email',
        'website',
        'phone',
        'street',
        'area',
        'town',
        'zipcode',
        'country',
      ]),
    }
  }
</script>
