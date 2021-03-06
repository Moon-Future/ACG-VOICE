// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { Toast, InfiniteScroll  } from 'mint-ui'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueLazyload, {
  loading: require('assets/loading-2.gif')
})
Vue.use(InfiniteScroll)
Vue.prototype.$toast = Toast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
