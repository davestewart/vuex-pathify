<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Pathify (implicit)</h2>
      <blockquote>
        <p>Demo uses core Pathify get and sync functions, sub-property access, and implicit wildcard syntax.</p>
        <view-code src="examples/large/views/PathifyImplicit.vue"/>
        <view-code src="examples/large/stores/pathify.js"/>
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
  import { sync } from 'vuex-pathify'

  export default {
    computed: sync('user1/*'),
  }
</script>
