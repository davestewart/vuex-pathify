<template>
  <div id="app">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from 'components/Sidebar'
import Home from 'components/Home'
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

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  // display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


* {
  text-align: left;
  line-height: 1.4em;
}

pre {
  display: inline-block;
  padding: 10px;
  background: #FCFCFC;
  border-radius: 4px;
  color: black;
}
</style>
