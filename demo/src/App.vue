<template>
  <div id="demo">
    <sidebar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Sidebar from './views/components/nav/Sidebar'
import Home from './views/pages/Home'

export default {

  components: {
    Home,
    Sidebar,
  },

  data () {
    return {
      msg: 'Welcome to Vue'
    }
  }
}
</script>
