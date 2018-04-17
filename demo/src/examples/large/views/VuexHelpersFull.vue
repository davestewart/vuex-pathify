<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vuex helpers (full)</h2>
      <blockquote>
        <p>Demo uses Vuex helpers and manually-created handlers, accessing the store via getters and actions.</p>
        <links file="examples/large/views/VuexHelpersFull.vue"/>
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

    <div class="card">
      <div class="card-content content">
        <p class="title is-4">{{ firstName }} {{ lastName }}</p>
        <p class="subtitle is-6"><a :href="'mailto:' + email">{{ email }}</a> | <a :href="website">{{ website }}</a> |
          {{ phone }}</p>
        <p>{{ street }}<br>{{ area }}<br>{{ town }}<br>{{ zipcode }}<br>{{ country }}</p>
      </div>
    </div>

  </article>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {

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
