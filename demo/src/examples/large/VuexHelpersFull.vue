<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vuex helpers (full)</h2>
      <blockquote>
        <p>Demo uses Vuex helpers and manually-created handlers, accessing the store via getters and actions</p>
        <edit-code src="examples/large/VuexHelpersFull.vue"/>
        <edit-code src="examples/large/vuex/vuex-full.js"/>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <ui-input label="First Name"
                  :value="firstName"
                  @input="setFirstName"
        />
        <ui-input label="Last Name"
                  :value="lastName"
                  @input="setLastName"
        />
        <ui-input label="Email"
                  :value="email"
                  @input="setEmail"
        />
        <ui-input label="Website"
                  :value="website"
                  @input="setWebsite"
        />
        <ui-input label="Phone"
                  :value="phone"
                  @input="setPhone"
        />
      </fieldset>

      <fieldset class="column">
        <ui-input label="Street"
                  :value="street"
                  @input="setStreet"
        />
        <ui-input label="Area"
                  :value="area"
                  @input="setArea"
        />
        <ui-input label="Town"
                  :value="town"
                  @input="setTown"
        />
        <ui-input label="Zipcode"
                  :value="zipcode"
                  @input="setZipcode"
        />
        <ui-input label="Country"
                  :value="country"
                  @input="setCountry"
        />
      </fieldset>
    </div>

    <user-card user="user6"/>

  </article>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import base from './ui/base.js'

  export default {

    extends: base,

    computed: {
      ...mapGetters('user6', [
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
      ])
    },

    methods: {
      ...mapActions('user6', [
        'setFirstName',
        'setLastName',
        'setEmail',
        'setWebsite',
        'setPhone',
        'setStreet',
        'setArea',
        'setTown',
        'setZipcode',
        'setCountry',
      ]),
    },
  }

</script>
