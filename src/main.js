import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '@/store'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import '@/assets/styles/index.scss'

fastclick.attach(document.body)

Vue.config.productionTip = false 

Vue.use(VueLazyLoad,{
  loading: require('@/assets/logo.png')
})

new Vue({
  router, 
  store,
  render: h => h(App)
}).$mount('#app')
