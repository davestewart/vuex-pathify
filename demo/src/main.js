import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// ui
import './views/components'

// styles
// import 'font-awesome'
import 'bulma/css/bulma.css'
import './assets/styles/index.scss'
// import './assets/vendor/vue.css'

Vue.config.productionTip = false

window.app = new Vue({
  el: '#demo',
  router,
  store,
  template: '<App/>',
  components: { App }
})
