<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vuex helpers (full)</h2>
      <blockquote>
        <p>Demo uses Vuex helpers and manually-created handlers, accessing the store via getters and actions.</p>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <legend>Personal</legend>
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
        <legend>Address</legend>
        <ui-input label="Line1"
                  :value="line1"
                  @input="setLine1"
                  />
        <ui-input label="Line2"
                  :value="line2"
                  @input="setLine2"
                  />
        <ui-input label="Town"
                  :value="town"
                  @input="setTown"
                  />
        <ui-input label="Zipcode"
                  :value="zipcode"
                  @input="setZipcode"
                  />
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
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

    computed: {

      ...mapGetters('user4', [
        'name',
        'firstName',
        'lastName',
        'email',
        'website',
        'phone',
        'address',
        'line1',
        'line2',
        'town',
        'zipcode',
      ])
    },

    methods: {
      ...mapActions('user4', [
        'setFirstName',
        'setLastName',
        'setEmail',
        'setWebsite',
        'setPhone',
        'setAddress',
        'setLine1',
        'setLine2',
        'setTown',
        'setZipcode',
      ]),
    },
  }

</script>
