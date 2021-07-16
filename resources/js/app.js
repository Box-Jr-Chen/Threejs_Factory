import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
// import Axios from 'axios'
import router from './router/index'
import store from './store/index'
import infiniteScroll from "vue-infinite-scroll";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

Vue.use(VueRouter)
Vue.use(infiniteScroll)
// Vue.prototype.$ajax = Axios
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
