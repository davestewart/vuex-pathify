import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// ui
import 'components/index'

// styles
import './assets/styles.css'

Vue.config.productionTip = false

window.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
