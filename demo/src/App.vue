<template>
  <div id="demo">
    <sidebar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Sidebar from 'components/Sidebar'
import Home from 'pages/Home'

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
