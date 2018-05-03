import Vue from 'vue'
import App from './app/App'
import store from './app/store'
import router from './app/router'

// ui
import './app/views/components'

// styles
import 'bulma/css/bulma.css'
import './app/assets/styles/index.scss'

Vue.config.productionTip = false

window.app = new Vue({
  el: '#demo',
  router,
  store,
  template: '<App/>',
  components: { App }
})
